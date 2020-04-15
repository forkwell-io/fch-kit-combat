import * as firebase from 'firebase/app';
import {User, UserBase} from './user';

export interface ContributionItem {
  name: string;
  qty: number;
}

export interface ContributionParams {
  items: {
    name: string;
    qty: number;
  }[];
  status?: ContributionStatus;
}

export type ContributionStatus = 'waiting' | 'transporting' | 'received';

export interface ContributionDetails {
  sender: UserBase;
  contributionItems: ContributionItem[];
  remarks: string;
  contributionItemsTransporting?: {
    name: string;
    qty: number;
  }[];
  contributionItemsReceived?: {
    name: string;
    qty: number;
  }[];
  senderId?: string;
  dateCrt?: firebase.firestore.Timestamp;
  status?: ContributionStatus;
  requestId?: string;
  receiverId?: string;
  id?: string;
}

export interface ContributionAcceptedParams {
  itemReceived: ContributionItem[];
}

export interface RequestItem {
  name: string;
  qtyNeed: number;
  qtyFilled: number;
}

export type RequestStatus = 'active'|'complete';

export interface Request {
  user: string;
  status?: RequestStatus;
  dateUpd?: firebase.firestore.Timestamp;
  dateCrt?: firebase.firestore.Timestamp;
  active?: string[];
  complete?: string[];
  userInfo?: {
    name: string;
    email: string;
  };
}

export interface RequestObject extends Request {
  id?: string;
  requestItems?: RequestItem[];
  userInfo?: User;
}

export const DEFAULT_REQUEST_ITEMS = [ 
'Isolation Gowns', 'Level 2 Gowns', 'Level 3 Gowns', 'Level 4 Gowns', 'Coveralls (Full suit, with or without hood)',
'KN95 Masks', 'N95 Masks', 'Respirator', 'Respirator Filters', 'Disposable Filtering Face Pieces', 'Exam Mask Paediatric',
'Surgical Mask', 'Exam Mask (Ear loop)', 'FFP2 Masks', 'Procedure Masks', 'Surgical Gloves', 'Medical Examination Gloves - Rubber Latex', 
'Nitrile Gloves (exam)', 
'Viral Swabs', 'Disinfectants', 'Disinfectant Wipes', 'Hand Sanitizer', 'Hand Sanitizer Foam', 
'Head Hood Covers (Balaclava)', 'Knee-high Shoe Covers (Impervious)', 
'Safety/Protective Goggles', 'FIT Testing Supplies',
'Thermometer', 'Ventilators', 'Zip Lock Bags', 'Blanket'];

export interface RequestStats {
  itemsByUsers: string[];
  active: number;
  complete: number;
}
