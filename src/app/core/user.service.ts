import {Injectable} from '@angular/core';
import {AppUser} from './app-user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<AppUser>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<AppUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider): Promise<void | UserCredential> {
    console.log('starting oAuthLogin');

    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        console.log('user retrieved: ' + credential.user.displayName);

        this.updateUserData(credential.user)
          .then( () => {
            console.log('user successfully written');
          })
          .catch( () => {
            console.log('error writing user');
          });
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  private updateUserData(user): Promise<void> {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: AppUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      roles: {
        subscriber: true
      }
    };

    return userRef.set(data, {merge: true});
  }

  // Abilities and roles authorization
  // Assign roles to an ability method

  canRead(user: AppUser): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: AppUser): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: AppUser): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: AppUser, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }

    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }

    return false;
  }
}
