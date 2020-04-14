import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestItem} from '../../@core/firestore-interfaces/request';
import {FirebaseService} from '../firebase.service';
import {__STATS__, __STATS__ITEMS, REQUESTS, REQUESTS__ITEMS, USERS} from '../../@core/firestore-collections';

import {RequestService} from './request.service';
import {User, UserStats} from '../../@core/firestore-interfaces/user';

export interface AgenciesNeedItemResult {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(
    private firebaseService: FirebaseService,
    private requestService: RequestService
  ) {
  }

  mostWantedItems(limit = 5): Promise<RequestItem[]> {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore()
        .collection(REQUESTS).doc(__STATS__)
        .collection(__STATS__ITEMS)
        .orderBy('qtyNeed', 'desc')
        .limit(limit)
        .get()
        .then(snapshot => {
          const items = [];
          const docs = snapshot.docs;
          docs.forEach(doc => {
            items.push(doc.data() as RequestItem);
          });
          resolve(items);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  get agencyJoined(): Observable<number> {
    return new Observable<number>(subscriber => {
      this.firebaseService.firestore().collection(USERS).doc(__STATS__)
        .onSnapshot(snapshot => {
          const data = snapshot.data() as UserStats;
          subscriber.next(data.agencies);
        });
    });
  }

  get completeRequest(): Observable<number> {
    return new Observable<number>(subscriber => {
      this.firebaseService.firestore().collection(REQUESTS).doc(__STATS__)
        .onSnapshot(snapshot => {
          const data = snapshot.data();
          subscriber.next(data.complete);
        });
    });
  }

  get activeRequest(): Observable<number> {
    return new Observable<number>(subscriber => {
      this.firebaseService.firestore().collection(REQUESTS).doc(__STATS__)
        .onSnapshot(snapshot => {
          const data = snapshot.data();
          subscriber.next(data.active);
        });
    });
  }

  /**
   * real-time data of overall request items
   *
   * @todo unsubscribe() on component destroy to avoid memory leaks
   */
  get requestItemsSnapshot(): Observable<RequestItem[]> {
    return new Observable(subscriber => {
      this.firebaseService.firestore().collection(REQUESTS).doc(__STATS__)
        .collection(__STATS__ITEMS)
        .onSnapshot(snapshot => {
          const requestItems: RequestItem[] = [];

          snapshot.docs.forEach(doc => {
            const item = doc.data() as RequestItem;
            if (!((item.qtyFilled >= item.qtyNeed))) {
              requestItems.push(item);
            }
          });

          subscriber.next(requestItems);
        });
    });
  }

  getAgenciesNeedItem(itemName: string): Promise<AgenciesNeedItemResult[]> {
    const agencies: AgenciesNeedItemResult[] = [];
    return this.firebaseService.firestore()
      .collection(USERS)
      .where(`_recentNeededItems.${itemName}`, '>', 0)
      .get()
      .then(snapshot => {
        const docs = snapshot.docs;
        docs.forEach(doc => {
          const data = doc.data() as User;
          const agencyResult: AgenciesNeedItemResult = {
            id: doc.id,
            name: data.name
          };
          agencies.push(agencyResult);
        });
        return agencies;
      }).catch(e => {
        console.error(e);
        return agencies;
      });
  }
}
