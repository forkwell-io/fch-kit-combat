import {Injectable} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {UserService} from './user.service';
import {
  ContributionStatus,
  DEFAULT_REQUEST_ITEMS,
  Request,
  RequestItem,
  RequestObject,
  RequestStats, RequestStatus
} from '../../@core/firestore-interfaces/request';

import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import {__STATS__, CONTRIBS, MESSAGES, REQUESTS, REQUESTS__ITEMS} from '../../@core/firestore-collections';
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentData = firebase.firestore.DocumentData;
import WriteBatch = firebase.firestore.WriteBatch;
import {RequestService} from './request.service';
import {RequestContribution} from '../../@core/requestContribution';
import {Observable} from 'rxjs';
import {MessageStatus} from '../../@core/firestore-interfaces/messages';

@Injectable({
  providedIn: 'root'
})
/**
 * everything related to current user
 */
export class UserRequestService {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private requestService: RequestService
  ) {
  }

  async incomingContributionsCount(): Promise<Observable<number>> {
    const user = await this.userService.currentUser();
    const userId = user.uid;

    return new Observable(subscriber => {
      subscriber.next(0);

      this.firebaseService.firestore().collection(CONTRIBS)
        .where('receiverId', '==', userId)
        .where('status', '==', <ContributionStatus>'waiting')
        .onSnapshot(snapshot => {
          subscriber.next(snapshot.docs.length);
        });
    });
  }

  /**
   * get aggregated count of user's request item
   */
  get requestItemsOverview(): Promise<RequestItem[]> {
    return new Promise(async (resolve, reject) => {
      const user = await this.userService.currentUser();
      const userId = user.uid;
      this.firebaseService.firestore()
        .collection(REQUESTS).where('user', '==', userId)
        .get().then(async snapshot => {
        const requestItems: RequestItem[] = [];
        for (const doc of snapshot.docs) {
          const _requestItems = await this.requestService._getRequestItems(doc.id);
          _requestItems.forEach(item => {
            const index = requestItems.findIndex(value => {
              return value.name === item.name;
            });
            if (index >= 0) {
              requestItems[index].qtyNeed += +item.qtyNeed;
              requestItems[index].qtyFilled += +item.qtyFilled;
            } else {
              requestItems.push(item);
            }
          });
        }
        resolve(requestItems);
      }).catch(e => {
        reject(e);
      });
    });
  }

  get defaultRequestItemNames() {
    return DEFAULT_REQUEST_ITEMS;
  }

  get itemsByOtherUsers() {
    return this.firebaseService.firestore()
      .collection(REQUESTS).doc(__STATS__)
      .get()
      .then(snapshot => {
        const data = snapshot.data() as RequestStats;
        return data.itemsByUsers || [];
      })
      .catch(e => {
        console.error(e);
        return [];
      });
  }

  /**
   * @return requests by current user
   */
  async getRequests(): Promise<RequestObject[]> {
    const user = await this.userService.currentUser();
    const userId = user.uid;
    return this.requestService._getRequestsByUserId(userId);
  }

  /**
   * delete specific request. For now, no firestore rules
   *
   * @param requestId
   */
  deleteRequest(requestId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this._deleteRequestItems(requestId);
        await this.firebaseService.firestore().collection(REQUESTS).doc(requestId).delete();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * change status to 'complete'
   * @param requestId
   */
  markRequestAsComplete(requestId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore()
        .collection(REQUESTS)
        .doc(requestId)
        .update({
          status: <RequestStatus>'complete'
        })
        .then(() => {
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  /**
   * creates new request
   *
   * @return document id
   *
   * @param requestContribution
   */
  createRequest(requestContribution: RequestContribution): Promise<string> {
    const request = requestContribution.request;
    const requestItems = requestContribution.requestItems;

    return new Promise(async (resolve, reject) => {
      const user = await this.userService.currentUserInfo();

      request.dateCrt = Timestamp.now();
      request.status = 'active';
      request.userInfo.name = user.name;
      request.userInfo.email = user.email;

      let batch = this.firebaseService.firestore().batch();
      const ref = await this.firebaseService.firestore().collection(REQUESTS).add(request);

      this._addRequestItems(requestItems, ref, batch);

      try {
        await batch.commit();
        resolve(ref.id);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * update specific request
   *
   * @example
   * requestContrib = requestService.getRequest(requestId) // or any other way you can find
   * userRequestService.updateRequest(requestContrib)
   *
   * @param requestContribution
   */
  updateRequest(requestContribution: RequestContribution): Promise<void> {
    const id = requestContribution.id;
    const request = requestContribution.request;
    const requestItems = requestContribution.requestItems;

    request.dateUpd = Timestamp.now();

    return new Promise(async (resolve, reject) => {
      const ref = this.firebaseService.firestore().collection(REQUESTS).doc(id);
      try {
        await ref.set(request as Request, {merge: true});
        await this._updateRequestItems(id, requestItems);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * update request items of a specific request. This will update matching data and REMOVE missing data from requestItems
   * e.g requestItems has only 2 items, but in the database it has 3, the missing item will be removed
   *
   * @param requestId
   * @param requestItems
   *
   * @private
   */
  private async _updateRequestItems(requestId: string, requestItems: RequestItem[]): Promise<void> {
    const requestItemNames: string[] = requestItems.map(value => {
      return value.name;
    });

    const batch = this.firebaseService.firestore().batch();
    const ref = this.firebaseService.firestore().collection(REQUESTS).doc(requestId);
    const itemsColRef = ref.collection(REQUESTS__ITEMS);

    const itemsRef = await itemsColRef.get();
    const currentItemNames: string[] = itemsRef.docs.map(value => {
      return value.id;
    });

    // delete missing
    currentItemNames.forEach(name => {
      if (!requestItemNames.includes(name)) {
        const deleteRef = itemsColRef.doc(name);
        batch.delete(deleteRef);
      }
    });

    // set data
    requestItems.forEach(item => {
      const setRef = itemsColRef.doc(item.name);
      batch.set(setRef, {
        name: item.name,
        qtyFilled: +item.qtyFilled,
        qtyNeed: +item.qtyNeed
      } as RequestItem);
    });

    return new Promise(async (resolve, reject) => {
      try {
        await batch.commit();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  private _addRequestItems(
    requestItems: RequestItem[],
    ref: DocumentReference<DocumentData>, batch: WriteBatch): void {
    requestItems.forEach(item => {
      const itemRef = ref.collection(REQUESTS__ITEMS).doc(item.name);
      batch.set(itemRef, {
        name: item.name,
        qtyFilled: +item.qtyFilled,
        qtyNeed: +item.qtyNeed
      } as RequestItem);
    });
  }

  /**
   *
   * @param requestId
   * @param requestItems, list of item id(name)
   * @private
   */
  private _deleteRequestItems(requestId: string, requestItems?: string[]): Promise<void> {
    const batch = this.firebaseService.firestore().batch();
    const ref = this.firebaseService.firestore().collection(REQUESTS).doc(requestId);
    return new Promise(async (resolve, reject) => {
      if (requestItems && requestItems.length > 0) {
        for (const item of requestItems) {
          const itemRef = ref.collection(REQUESTS__ITEMS).doc(item);
          batch.delete(itemRef);
        }
      } else {
        const itemRef = await ref.collection(REQUESTS__ITEMS).get();
        itemRef.forEach(doc => {
          batch.delete(doc.ref);
        });
      }

      batch.commit().then(() => {
        resolve();
      }).catch(e => {
        reject(e);
      });
    });
  }
}
