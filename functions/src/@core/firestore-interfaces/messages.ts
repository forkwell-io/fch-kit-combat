import * as firebase from 'firebase';
import {UserBase} from './user';

export type MessageStatus = 'unread' | 'read';

export interface MessageDocument {
  content: string;
  sender: string | UserBase;
  requestId: string;
  status: MessageStatus;
  dateCrt: firebase.firestore.Timestamp;
  receiverId?: string;
}
