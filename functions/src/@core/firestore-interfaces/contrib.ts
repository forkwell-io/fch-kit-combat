import {UserBase} from './user';
import * as firebase from 'firebase';

export interface ContribItem {
  name: string;
  qty: number;
}

export interface Contrib {
  request: string;
  user?: string;
  guest?: UserBase;
  dateUpd?: firebase.firestore.Timestamp;
  dateCrt?: firebase.firestore.Timestamp;
  // items?: firebase.firestore.CollectionReference;
}

export interface ContribObject extends Contrib {
  id: string;
  contribItems: ContribItem[];
}
