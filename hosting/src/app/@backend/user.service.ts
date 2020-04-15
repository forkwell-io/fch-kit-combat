import {Injectable} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {USERS} from '../../@core/firestore-collections';
import {User} from '../../@core/firestore-interfaces/user';
import {AuthService} from '../auth/auth.service';

import * as firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;
import IdTokenResult = firebase.auth.IdTokenResult;

export interface UserAccount {
  email: string;
  password: string;
}

export interface RegisterUserResult {
  userCredential: UserCredential
}

export interface UserUpdateParams {
  address?: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private agencies: User[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
  ) {
  }

  /**
   * this does not update the user's profile. Only update data
   * use uploadUserPhoto() instead
   * @param userBase
   */
  updateProfile(userBase: UserUpdateParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const user = await this.currentUser();
      this.firebaseService.firestore().collection(USERS).doc(user.uid).set(userBase, {merge: true})
        .then(() => {
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  async currentUserInfo(): Promise<User> {
    const user = await this.currentUser();
    if (user) {
      return this._getUserInfo(user.uid);
    } else {
      return null;
    }
  }

  _getUserInfo(userId: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      return this.firebaseService.firestore().collection(USERS).doc(userId).get().then(snapshot => {
        resolve(snapshot.data() as User);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  currentUser(): Promise<firebase.User> {
    return this.authService.getCurrentUser();
  }

  iamVerifiedByAdmin(): Promise<boolean> {
    return this._firebaseIam('verifiedByAdmin');
    // return this._iam('verifiedByAdmin');
  }

  iamAdmin(): Promise<boolean> {
    return this._iam('admin');
  }

  iamEmailVerified(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const user = await this.currentUser();
      resolve(user.emailVerified);
    });
  }

  private _firebaseIam(key: string): Promise<boolean | false> {
    return new Promise<boolean>(async (resolve, reject) => {
      const user = await this.currentUserInfo();
      if (user && user[key]) {
        resolve(user[key]);
      } else {
        resolve(false);
      }
    });
  }

  private _iam(key: string): Promise<boolean | false> {
    return this._currentClaims().then(claims => {
      const hasKey = claims.hasOwnProperty(key);
      if (hasKey) {
        return <boolean> claims[key];
      } else {
        return false;
      }
    }).catch(reason => {
      return false;
    });
  }

  private async _currentClaims() {
    return new Promise(async (resolve, reject) => {
      try {
        const idTokenResult = await this._currentIdTokenResult();
        resolve(idTokenResult.claims);
      } catch (e) {
        reject(e);
      }
    });
  }

  private async _currentIdTokenResult(): Promise<IdTokenResult> {
    const user = await this.currentUser();
    return new Promise(async (resolve, reject) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        resolve(idTokenResult);
      } else {
        reject('Not logged in');
      }
    });
  }

  /**
   * has simple validation to check if MIME type is image or not, rejects if not
   *
   * will automatically update user's auth display image and user's data image url
   *
   * @param image
   * @return Promise<string> where string is the downloadUrl of the uploaded image
   */
  uploadUserPhoto(image: File): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const user = await this.currentUser();
      const userId = user.uid;

      const storageRef = this.firebaseService.storage().ref();
      const mime = image.type;

      if (mime.includes('image')) {
        // const extension = image.name.split('.').pop();
        // const newFilename = `${userId.toString()}.${extension}`;
        const newFilename = `${userId.toString()}`;
        const uploadRef = storageRef.child(`userImages/${newFilename}`);
        uploadRef.put(image).then(async a => {
          const downloadUrl = await a.ref.getDownloadURL();

          await Promise.all([
            this._updateUserPhotoUrl(downloadUrl),
            this._updateUserDisplayURL(downloadUrl)
          ]);

          resolve();
        }, b => {
          reject(b);
        }).catch(reason => {
          reject(reason);
        });
      } else {
        reject('File is not an image');
      }
    });
  }

  _updateUserPhotoUrl(downloadUrl: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const user = await this.currentUser();
      this.firebaseService.firestore().collection(USERS).doc(user.uid).set({
        imageUrl: downloadUrl
      }, {merge: true})
        .then(() => {
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  /**
   * update current user's photoURL
   * @param downloadUrl
   *
   * @TODO: update firestore as well
   */
  _updateUserDisplayURL(downloadUrl: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const user = await this.currentUser();
      try {
        await user.updateProfile({photoURL: downloadUrl});
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  registerAsUser(userAccount: UserAccount, user: User): Promise<RegisterUserResult> {
    user.roles = ['agency'];
    user.verifiedByAdmin = false;
    user.rejectedByAdmin = false;

    return new Promise(async (resolve, reject) => {
      try {
        // create user
        const userCredential = await this.firebaseService.auth().createUserWithEmailAndPassword(userAccount.email, userAccount.password);
        user.userId = userCredential.user.uid;

        // save in firestore
        await this.firebaseService.firestore().collection(USERS)
          .doc(user.userId)
          .set(user);

        resolve({
          userCredential
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  requestEmailVerification(userCredential: UserCredential): Promise<void> {
    return new Promise((resolve, reject) => {
      if (userCredential) {
        userCredential.user.sendEmailVerification().then(() => {
          resolve();
        }).catch(reason => {
          reject(reason);
        });
      } else {
        reject('userCredential is null');
      }
    });
  }

  _findUserIdByEmail(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.firebaseService.firestore().collection(USERS).where('email', '==', email).get().then(querySnapshot => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          resolve(doc.id);
        }
        reject(`No user found`);
      }).catch(reason => {
        resolve(reason);
      });
    });
  }
}
