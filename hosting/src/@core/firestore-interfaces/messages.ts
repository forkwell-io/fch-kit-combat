import * as firebase from 'firebase';
import {UserBase} from './user';

export type MessageStatus = 'unread' | 'read';

export interface MessageDocument {
  id?: string;
  subject: string;
  content: string;
  sender: UserBase;
  requestId: string;
  status: MessageStatus;
  dateCrt: firebase.firestore.Timestamp;
  receiverId?: string;
}
