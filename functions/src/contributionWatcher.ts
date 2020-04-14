import * as admin from "firebase-admin";
import {CONTRIBS, REQUESTS, REQUESTS__ITEMS} from "./@core/firestore-collections";
import {ContributionDetails, Request} from "./@core/firestore-interfaces/request";
import {sendNewContributionEmail} from "./mailer";

import {Change, EventContext} from "firebase-functions";
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import FieldValue = admin.firestore.FieldValue;

export function contributionWatcher(change: Change<DocumentSnapshot>, context: EventContext) {
    const firestore = admin.firestore();
    const batchRequest = firestore.batch();

    const contribId = context.params.contribId;
    const contribRef = firestore.collection(CONTRIBS).doc(contribId);

    const dataBefore = change.before.data() as ContributionDetails;
    const dataAfter = change.after.data() as ContributionDetails;

    const isDeleted = !dataAfter;
    const isCreated = !dataBefore;
    const isUpdated = dataBefore && dataAfter;

    return new Promise(async (resolve, reject) => {
        try {
            if (isDeleted) {
                // pass
            } else if (isUpdated) {
                const statusAfter = dataAfter.status;
                const statusBefore = dataBefore.status;

                const requestId = dataAfter.requestId;

                if (requestId) {
                    const requestRef = firestore.collection(REQUESTS)
                        .doc(requestId).collection(REQUESTS__ITEMS);
                    let incrementModifier = 0;

                    if (statusAfter === 'received' && (statusBefore !== statusAfter)) {
                        incrementModifier = 1;
                    } else if (statusAfter !== 'received' && statusBefore === 'received') {
                        incrementModifier = -1;
                    }

                    const itemsReceived = dataAfter.contributionItemsReceived;
                    if (itemsReceived && incrementModifier !== 0) {
                        itemsReceived.forEach(item => {
                            if (item.qty > 0) {
                                batchRequest.update(requestRef.doc(item.name), {
                                    qtyFilled: FieldValue.increment(incrementModifier * item.qty)
                                });
                            }
                        });
                    }
                }
            } else if (isCreated) {
                const requestId = dataAfter.requestId;
                if (requestId) {
                    const requestDoc = await firestore.collection(REQUESTS)
                        .doc(requestId).get();
                    const requestData = requestDoc.data() as Request;
                    await contribRef.update({
                        receiverId: requestData.user
                    });

                    const items = dataAfter.contributionItems;
                    const contributorName = dataAfter.sender.name;
                    const remarks = dataAfter.remarks;

                    await sendNewContributionEmail(
                        requestData.userInfo?.email,
                        contributorName,
                        items,
                        remarks
                    );
                }
            }

            await Promise.all([
                batchRequest.commit()
            ]);

            resolve();
        } catch (e) {
            reject(e);
        }
    });
}
