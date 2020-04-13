import {Injectable} from '@angular/core';
import {
  ContributionDetails, Request,
  RequestItem,
  RequestObject,
  RequestStatus
} from '../../@core/firestore-interfaces/request';
import {FirebaseService} from '../firebase.service';
import {UserService} from './user.service';
import {__STATS__, REQUESTS, REQUESTS__ITEMS, REQUESTS__MESSAGES} from '../../@core/firestore-collections';

import * as firebase from 'firebase/app';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;
import {LeaveMessageBuilder} from '../../@core/leaveMessage';
import {User} from '../../@core/firestore-interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
  ) {
  }

  topIncompleteRequests(count: number): Promise<RequestObject[]> {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore().collection(REQUESTS)
        .where('status', '==', <RequestStatus> 'active')
        .orderBy('dateCrt', 'desc')
        .limit(count).get().then(querySnapshot => {
        this._queryToRequestObject(querySnapshot).then(requestObjects => {
          requestObjects.sort((a, b) => {
            return a.dateCrt < b.dateCrt ? 1 : 0;
          });
          resolve(requestObjects);
        });
      }).catch(e => {
        reject(e);
      });
    });
  }

  /**
   * adds message to a request
   *
   * @param leaveMessageBuilder
   */
  leaveMessage(leaveMessageBuilder: LeaveMessageBuilder): Promise<void> {
    return new Promise((resolve, reject) => {
      const ref = this.firebaseService.firestore()
        .collection(REQUESTS)
        .doc(leaveMessageBuilder.requestId)
        .collection(REQUESTS__MESSAGES);
      ref.add(leaveMessageBuilder.message).then(() => {
        resolve();
      }).catch(e => {
        reject(e);
      });
    });
  }

  /**
   * get all request
   */
  getRequests(): Promise<RequestObject[]> {
    // TODO: pagination
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore().collection(REQUESTS)
        .orderBy('dateCrt', 'asc')
        .get()
        .then((querySnapshot) => {
          this._queryToRequestObject(querySnapshot)
            .then(requestObjects => {
              resolve(requestObjects);
            });
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  /**
   * get specific request
   *
   * @param requestId
   */
  getRequest(requestId: string): Promise<RequestObject> {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore().collection(REQUESTS)
        .doc(requestId)
        .get().then(async doc => {
        const data = doc.data() as Request;
        const id = doc.id;
        const requestItems: RequestItem[] = await this._getRequestItems(id);
        const userInfo: User = await this.userService._getUserInfo(data.user);
        const requestObject: RequestObject = {
          id,
          requestItems,
          status: data.status,
          user: data.user,
          dateCrt: data.dateCrt,
          userInfo
        };
        resolve(requestObject);
      }).catch(e => {
        reject(e);
      });
    });
  }

  _getRequestsByUserId(userId: string): Promise<RequestObject[]> {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore().collection(REQUESTS)
        .where('user', '==', userId)
        .get().then(async (querySnapshot) => {
        const requestObjects = await this._queryToRequestObject(querySnapshot);
        resolve(requestObjects);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  async _queryToRequestObject(querySnapshot: QuerySnapshot<DocumentData>): Promise<RequestObject[]> {
    if (querySnapshot.size > 0) {
      const requestObjects: RequestObject[] = [];
      for (const doc of querySnapshot.docs) {
        const id = doc.id;
        if (id !== __STATS__) {
          const data = doc.data() as Request;
          const requestItems: RequestItem[] = await this._getRequestItems(id);
          const requestObject: RequestObject = {
            id,
            requestItems,
            status: data.status,
            user: data.user,
            dateCrt: data.dateCrt,
            userInfo: null
          };

          // requestObject.userInfo = data.userInfo;
          if (!requestObject.userInfo) {
            const userInfo: User = await this.userService._getUserInfo(data.user);
            requestObject.userInfo = userInfo;
          }
          requestObjects.push(requestObject);
        }
      }
      return requestObjects;
    } else {
      return [];
    }
  }

  _getRequestItems(requestId: string): Promise<RequestItem[]> {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore().collection(REQUESTS).doc(requestId).collection(REQUESTS__ITEMS).get().then(querySnapshot => {
        const items: RequestItem[] = [];
        querySnapshot.docs.forEach(doc => {
          items.push(doc.data() as RequestItem);
        });
        resolve(items);
      }).catch(reason => {
        reject(reason);
      });
    });
  }
}
