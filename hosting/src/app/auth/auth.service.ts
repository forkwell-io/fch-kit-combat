import {Injectable} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firebase: FirebaseService) {
  }

  public isSignedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, _) => {
      const unsubscribable = this.firebase.auth()
        .onAuthStateChanged(user => {
          resolve(!!user);
          unsubscribable();
        });
    });
  }

  public createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this.firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  public getCurrentUser(): Promise<User> {
    return new Promise<User>((resolve, _) => {
      const unsubscribable = this.firebase.auth()
        .onAuthStateChanged(user => {
          resolve(user);
          unsubscribable();
        });
    });
  }

  public signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this.firebase.auth().signInWithEmailAndPassword(email, password);
  }

  public signOut(): Promise<void> {
    return this.firebase.auth().signOut();
  }
}
