import {Injectable} from '@angular/core';
import {User, UserRoles, UserStats} from '../../@core/firestore-interfaces/user';
import {__STATS__, USERS} from '../../@core/firestore-collections';
import {RegisterUserResult, UserAccount, UserService} from './user.service';
import {FirebaseService} from '../firebase.service';

import * as firebase from 'firebase/app';
import FieldValue = firebase.firestore.FieldValue;
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService
  ) {
  }

  /**
   * @todo unsubscribe
   */
  get pendingMemberCount() {
    return new Observable(subscriber => {
      this.firebaseService.firestore().collection(USERS).doc(__STATS__).onSnapshot(snapshot => {
        const data = snapshot.data() as UserStats;
        const pendingMember = data.pendingMembers;
        subscriber.next(pendingMember);
      });
    });
  }

  async getUserByEmail(userEmail: string): Promise<User> {
    const userId = await this.userService._findUserIdByEmail(userEmail);
    return this.getUserById(userId);
  }

  getUserById(userId: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.firebaseService.firestore().collection(USERS).doc(userId).get().then(snapshot => {
        resolve(snapshot.data() as User);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  createAdmin(email: string, user: User): Promise<void> {
    user.roles = ['admin'];
    return this._createUser(email, user);
  }

  createAgency(email: string, user: User): Promise<void> {
    user.roles = ['agency'];
    return this._createUser(email, user);
  }

  private _createUser(email: string, user: User): Promise<void> {
    user.verifiedByAdmin = true;
    user.rejectedByAdmin = false;
    return new Promise(async (resolve, reject) => {
      try {
        // create user through callable functions
        const registerUser = this.firebaseService.functions().httpsCallable('registerUser');
        const data = {
          email
        };
        console.info(data);
        const httpsCallableResult = await registerUser(data);
        const userId = httpsCallableResult.data;

        // save in firestore
        user.userId = userId;
        await this.firebaseService.firestore().collection(USERS)
          .doc(user.userId)
          .set(user);

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  getUnverifiedAgencies(): Promise<User[]> {
    const findRole: UserRoles = 'agency';
    return new Promise<User[]>((resolve, reject) => {
      this.firebaseService.firestore().collection(USERS)
        .where('roles', 'array-contains', findRole)
        .where('verifiedByAdmin', '==', false)
        .where('rejectedByAdmin', '==', false)
        .get()
        .then(value => {
          const unverifiedAgencies = [];
          value.docs.forEach(doc => {
            unverifiedAgencies.push(<User> doc.data());
          });
          resolve(unverifiedAgencies);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  /**
   * use this to verify user, updates 'verifiedByAdmin' to true
   * @param userId
   */
  verifyUser(userId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore().collection(USERS).doc(userId).set(<User> {verifiedByAdmin: true}, {merge: true})
        .then(value => {
          resolve(true);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  rejectUserApplication(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore().collection(USERS).doc(userId).set(<User> {rejectedByAdmin: true}, {merge: true})
        .then(value => {
          resolve();
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  async delegateAdminByEmail(email: string): Promise<boolean> {
    const userId = await this.userService._findUserIdByEmail(email);
    return this.delegateAdmin(userId);
  }

  delegateAdmin(userId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore().collection(USERS).doc(userId).set({roles: FieldValue.arrayUnion(<UserRoles> 'admin')}, {merge: true})
        .then(value => {
          resolve(true);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  /**
   * verified & unverified agencies
   */
  getAllAgency(): Promise<User[]> {
    const findRole: UserRoles = 'agency';
    return new Promise<User[]>(resolve => {
      const agencies = [];
      this.firebaseService.firestore().collection(USERS)
        .where('roles', 'array-contains', findRole)
        .get()
        .then(value => {
          value.docs.forEach(doc => {
            agencies.push(<User> doc.data());
          });
          resolve(agencies);
        });
    });
  }

  /**
   * get all types of users: admin, agency
   */
  getAllUser(): Promise<User[]> {
    const users: User[] = [];
    return new Promise<User[]>(resolve => {
      this.firebaseService.firestore().collection(USERS)
        .get().then(value => {
        value.docs.forEach(doc => {
          if (doc.id !== __STATS__) {
            users.push(<User> doc.data());
          }
        });
        resolve(users);
      });
    });
  }

  deleteUser(userId: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const registerUser = this.firebaseService.functions().httpsCallable('deleteUser');
      const data = {
        userId
      };
      try {
        await registerUser(data);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}
