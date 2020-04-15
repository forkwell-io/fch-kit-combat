import { Injectable } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {UserService} from './user.service';
import {RequestService} from './request.service';
import {CONTRIBS} from '../../@core/firestore-collections';
import {ContributionDetails, ContributionParams, ContributionStatus} from '../../@core/firestore-interfaces/request';

import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class UserContributionService {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private requestService: RequestService
  ) {
  }

  getContributionsByRequestId(requestId: string): Promise<ContributionDetails[]> {
    return new Promise<ContributionDetails[]>((resolve, reject) => {
      this.firebaseService.firestore()
        .collection(CONTRIBS)
        .where('requestId', '==', requestId)
        .get()
        .then(snaps => {
          const contribs: ContributionDetails[] = [];
          snaps.forEach(doc => {
            contribs.push(doc.data() as ContributionDetails);
          });
          resolve(contribs);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  /**
   * get current user's waiting contributions
   */
  get waitingContributions(): Promise<ContributionDetails[]> {
    return new Promise(async (resolve, reject) => {
      const user = await this.userService.currentUser();
      const userId = user.uid;

      this.firebaseService.firestore()
        .collection(CONTRIBS)
        .where('receiverId', '==', userId)
        .where('status', '==', <ContributionStatus>'waiting')
        .get()
        .then(snapshot => {
          const items: ContributionDetails[] = [];
          snapshot.docs.forEach(doc => {
            const data = doc.data() as ContributionDetails;
            data.id = doc.id;
            items.push(data);
          });
          resolve(items);
        }).catch(e => {
        reject(e);
      });
    });
  }

  /**
   * @description
   * get()
   */
  get transportingContributions(): Promise<ContributionDetails[]> {
    return new Promise(async (resolve, reject) => {
      const user = await this.userService.currentUser();
      const userId = user.uid;

      this.firebaseService.firestore()
        .collection(CONTRIBS)
        .where('receiverId', '==', userId)
        .where('status', '==', <ContributionStatus>'transporting')
        .get()
        .then(snapshot => {
          const items: ContributionDetails[] = [];
          snapshot.docs.forEach(doc => {
            const data = doc.data() as ContributionDetails;
            data.id = doc.id;
            items.push(data);
          });
          resolve(items);
        }).catch(e => {
        reject(e);
      });
    });
  }

  /**
   * @description
   * get()
   */
  get receivedContributions(): Promise<ContributionDetails[]> {
    return new Promise(async (resolve, reject) => {
      const user = await this.userService.currentUser();
      const userId = user.uid;

      this.firebaseService.firestore()
        .collection(CONTRIBS)
        .where('receiverId', '==', userId)
        .where('status', '==', <ContributionStatus>'received')
        .get()
        .then(snapshot => {
          const items: ContributionDetails[] = [];
          snapshot.docs.forEach(doc => {
            const data = doc.data() as ContributionDetails;
            data.id = doc.id;
            items.push(data);
          });
          resolve(items);
        }).catch(e => {
        reject(e);
      });
    });
  }

  /**
   * @description
   * get()
   */
  get myContributions(): Promise<ContributionDetails[]> {
    return new Promise(async (resolve, reject) => {
      const user = await this.userService.currentUser();
      const userEmail = user.email;

      this.firebaseService.firestore()
        .collection(CONTRIBS)
        .where('sender.email', '==', userEmail)
        .get()
        .then(snapshot => {
          const items: ContributionDetails[] = [];
          snapshot.docs.forEach(doc => {
            const data = doc.data() as ContributionDetails;
            data.id = doc.id;
            items.push(data);
          });
          resolve(items);
        }).catch(e => {
        reject(e);
      });
    });
  }

  transportContribution(contribId: string, contributionParams: ContributionParams) {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore()
        .collection(CONTRIBS)
        .doc(contribId)
        .update({
          contributionItemsTransporting: contributionParams.items,
          dateTransport: Timestamp.now(),
          status: <ContributionStatus>'transporting'
        })
        .then(() => {
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  receiveContribution(contribId: string, contributionParams: ContributionParams) {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore()
        .collection(CONTRIBS)
        .doc(contribId)
        .update({
          contributionItemsReceived: contributionParams.items,
          dateRcvd: Timestamp.now(),
          status: <ContributionStatus>'received'
        })
        .then(() => {
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
