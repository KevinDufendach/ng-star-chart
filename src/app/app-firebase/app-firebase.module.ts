import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ]
})
export class AppFirebaseModule {
}
