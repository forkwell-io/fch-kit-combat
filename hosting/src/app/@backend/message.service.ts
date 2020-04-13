import { Injectable } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {UserService} from './user.service';
import {RequestService} from './request.service';
import {Observable} from 'rxjs';
import {CONTRIBS, MESSAGES, REQUESTS, REQUESTS__MESSAGES} from '../../@core/firestore-collections';
import {ContributionStatus} from '../../@core/firestore-interfaces/request';
import {LeaveMessageBuilder} from '../../@core/leaveMessage';
import {MessageDocument, MessageStatus} from '../../@core/firestore-interfaces/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private requestService: RequestService
  ) {
  }

  getMessages(): Promise<MessageDocument[]> {
    return new Promise(async (resolve, reject) => {
      const user = await this.userService.currentUser();
      const userId = user.uid;

      const messages: MessageDocument[] = [];

      this.firebaseService.firestore()
        .collection(MESSAGES)
        .where('receiverId', '==', userId)
        .get()
        .then(snaps => {
          snaps.docs.forEach(doc => {
            const messageData = doc.data() as MessageDocument;
            messageData.id = doc.id;
            messages.push(messageData);
          });
          resolve(messages);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  /**
   * send message, userBase must be provided. Can get from user service if logged in
   * or manually enter
   *
   * @example
   *
   * const userInfo = await userService.currentUserInfo();
   * const user: UserBase = {
   *    name: userInfo.name,
   *    phone: userInfo.phone,
   *    email: userInfo.email
   *  };
   * const leaveMessage = new LeaveMessageBuilder(
   * '',
   * user,
   * 'Hey!',
   * 'How you doin?'
   * );
   * await service.sendMessage(leaveMessage);
   *
   * @param leaveMessageBuilder
   */
  sendMessage(
    leaveMessageBuilder: LeaveMessageBuilder
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const ref = this.firebaseService.firestore()
        .collection(MESSAGES);
      ref.add(leaveMessageBuilder.message).then(() => {
        resolve();
      }).catch(e => {
        reject(e);
      });
    });
  }

  /**
   * returns observable number of unread messages by this user
   * @description get
   */
  async unreadMessagesCount(): Promise<Observable<number>> {
    const user = await this.userService.currentUser();
    const userId = user.uid;

    return new Observable(subscriber => {
      subscriber.next(0);

      this.firebaseService.firestore().collection(MESSAGES)
        .where('receiverId', '==', userId)
        .where('status', '==', <MessageStatus> 'unread')
        .orderBy('dateCrt', 'asc')
        .onSnapshot(snapshot => {
          subscriber.next(snapshot.docs.length);
        });
    });
  }

  markAsRead(id: string): Promise<void> {
    return this.firebaseService.firestore()
      .collection(MESSAGES)
      .doc(id)
      .update({status: <MessageStatus>'read'})
      .then(() => {
        return;
      })
      .catch(e => {
        console.error(e);
        return;
      });
  }
}
