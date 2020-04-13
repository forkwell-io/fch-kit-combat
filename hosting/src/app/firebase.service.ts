import {Injectable, isDevMode} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

import Auth = firebase.auth.Auth;
import Firestore = firebase.firestore.Firestore;
import Storage = firebase.storage.Storage;
import Functions = firebase.functions.Functions;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: firebase.app.App;
  private firebaseConfig = {
    apiKey: 'AIzaSyCn10WzwrGOpDLVdUP8DYkc3mFzOLsgFtA',
    authDomain: 'neuon-hackathon-holmes.firebaseapp.com',
    databaseURL: 'https://neuon-hackathon-holmes.firebaseio.com',
    projectId: 'neuon-hackathon-holmes',
    storageBucket: 'neuon-hackathon-holmes.appspot.com',
    messagingSenderId: '891256246600',
    appId: '1:891256246600:web:dac5e5a1e561b05b1c237d',
    measurementId: 'G-BQGZZM60C0'
  };

  constructor() {
    try {
      this.app = firebase.initializeApp(this.firebaseConfig);
    } catch (e) {
      console.error(e);
    }
  }

  public auth(): Auth {
    return firebase.auth();
  }

  public firestore(): Firestore {
    return firebase.firestore();
  }

  public storage(): Storage {
    return firebase.storage();
  }

  public functions(): Functions {
    const functions = this.app.functions('asia-east2');
    if (isDevMode()) {
      functions.useFunctionsEmulator('http://localhost:5001');
    }
    return functions;
  }
}
