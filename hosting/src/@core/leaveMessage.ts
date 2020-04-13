import {UserBase} from './firestore-interfaces/user';

import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import {MessageDocument} from './firestore-interfaces/messages';

/**
 * the user base should be automatically filled if user is not guest
 */
export class LeaveMessageBuilder {
  private _requestId: string;
  private _message: MessageDocument;

  /**
   *
   * @param requestId
   * @param user string|UserBase, if string it must be a valid uid of the user
   * @param message
   */
  constructor(requestId: string, user: UserBase, subject: string, message: string) {
    this.requestId = requestId;

    const newMessage: MessageDocument = {
      sender: user,
      requestId,
      subject,
      content: message,
      dateCrt: Timestamp.now(),
      status: 'unread'
    };

    this.requestId = requestId;
    this.message = newMessage;
  }

  get message(): MessageDocument {
    return this._message;
  }

  set message(value: MessageDocument) {
    this._message = value;
  }

  get requestId(): string {
    return this._requestId;
  }

  set requestId(value: string) {
    this._requestId = value;
  }
}
