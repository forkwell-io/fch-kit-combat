import { Injectable } from '@angular/core';
import {ContributionDetails} from '../../@core/firestore-interfaces/request';
import {CONTRIBS} from '../../@core/firestore-collections';
import {FirebaseService} from '../firebase.service';

import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class ContribsService {

  constructor(
    private firebaseService: FirebaseService,
  ) {
  }

  contributeToRequest(requestId: string, contributionDetails: ContributionDetails): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        contributionDetails.dateCrt = Timestamp.now();
        contributionDetails.status = 'waiting';
        contributionDetails.requestId = requestId;
        await this.firebaseService.firestore()
          .collection(CONTRIBS)
          .add(contributionDetails);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}
