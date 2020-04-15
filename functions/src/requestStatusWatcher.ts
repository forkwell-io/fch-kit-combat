import {Change, EventContext} from "firebase-functions";
import * as admin from "firebase-admin";
import {__STATS__, __STATS__ITEMS, REQUESTS, REQUESTS__ITEMS, USERS} from "./@core/firestore-collections";
import {Request, RequestItem, RequestStatus} from "./@core/firestore-interfaces/request";

import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import FieldValue = admin.firestore.FieldValue;

export async function requestStatusWatcher(change: Change<DocumentSnapshot>, context: EventContext) {
    const firestore = admin.firestore();
    const batch = firestore.batch();
    const statsBatch = firestore.batch();

    const requestId = context.params.requestId;
    const dataBefore = change.before.data() as Request;
    const dataAfter = change.after.data() as Request;

    const isDeleted = !dataAfter;
    const isCreated = !dataBefore;
    const isUpdated = dataBefore && dataAfter;

    const statsRef = firestore.collection(REQUESTS).doc(__STATS__);
    const requestRef = firestore.collection(REQUESTS).doc(requestId);
    let userRef: FirebaseFirestore.DocumentReference<any>;

    let activeRequest = 0;
    let completeRequest = 0;
    let requestStatus: RequestStatus | null = null;

    if (isDeleted) {
        if (dataBefore.status === 'active') {
            activeRequest = -1;
            console.info('Trying to update stats due to deletion');
        } else if (dataBefore.status === 'complete') {
            completeRequest = -1;
        }

        // remove active items from user
        userRef = firestore.collection(USERS).doc(dataBefore.user);
        const activeItemsBefore = dataBefore.active as string[];
        if (activeItemsBefore) {
            activeItemsBefore.forEach(item => {
                batch.update(userRef, {
                    ['_recentNeededItems.' + item]: FieldValue.increment(-1)
                });
            });
        }
    } else if (isUpdated) {
        // check if status is force-fully changed
        let isJustCompleted = justCompleted(dataBefore, dataAfter);
        // check if list is changed
        const isListChanged = listChanged(dataBefore, dataAfter);

        // don't check item progress if forced change to complete
        if (isJustCompleted) {
            // pass
            completeRequest = 1;
            activeRequest = -1;

            // decrement items
            const requestItems = await requestRef.collection(REQUESTS__ITEMS).get();
            requestItems.forEach(doc => {
                const itemData = doc.data() as RequestItem;
                statsBatch.update(statsRef.collection(__STATS__ITEMS).doc(itemData.name), {
                    qtyNeed: FieldValue.increment(-itemData.qtyNeed),
                    qtyFilled: FieldValue.increment(-itemData.qtyFilled),
                });
            });
        }
        if ((isListChanged.complete && isListChanged.active)) {
            if (isListChanged.active || isListChanged.complete) {
                const afterComplete = dataAfter.complete;
                const afterActive = dataAfter.active;

                if (afterComplete !== undefined && afterActive !== undefined) {
                    if (afterComplete?.length > afterActive?.length) {
                        if (dataBefore.status !== 'complete') {
                            requestStatus = 'complete';
                            // completeRequest = 1;
                        }
                    } else if (afterActive.length > 0) {
                        if (dataBefore.status !== 'active') {
                            requestStatus = 'active';
                            // activeRequest = 1;
                        }
                    }
                }
            }
        }
    } else if (isCreated) {
        if (dataAfter.status === 'active') {
            activeRequest = 1;
        } else if (dataAfter.status === 'complete') {
            completeRequest = 1;
        }
    }

    statsBatch.update(statsRef, {
        active: FieldValue.increment(activeRequest),
        complete: FieldValue.increment(completeRequest),
    });

    if (requestStatus) {
        batch.update(requestRef, {status: requestStatus});
    }

    return Promise.all([
        batch.commit(),
        statsBatch.commit()
    ]);
}

function justCompleted(dataBefore: Request, dataAfter: Request): boolean {
    return (dataBefore.status !== dataAfter.status) && dataAfter.status === 'complete';
}

function listChanged(dataBefore: Request, dataAfter: Request): {
    active: boolean;
    complete: boolean;
} {
    const result = {
        active: false,
        complete: false
    };

    const activeListAfter = dataAfter.active;
    const completeListAfter = dataAfter.complete;
    const activeListBefore = dataBefore.active;
    const completeListBefore = dataBefore.complete;

    if (completeListAfter && activeListAfter) {
        const activeListChanged = activeListBefore !== activeListAfter;
        const completeListChanged = completeListBefore !== completeListAfter;

        result.complete = completeListChanged;
        result.active = activeListChanged;
    }

    return result;
}
