import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Household, HouseholdPrivateData} from './household';
import {AuthService} from './auth.service';
import {AppUser} from './app-user';

@Injectable({
  providedIn: 'root'
})
export class HouseholdManagerService {

  constructor(
    private afs: AngularFirestore,
    private appAuth: AuthService,
  ) { }

  createHousehold(displayName: string) {
    this.appAuth.user$.subscribe((user) => {
      if (user) {
        // const householdCollectionRef: AngularFirestoreCollection<any> = this.afs.collection('households');
        const householdColRef: AngularFirestoreCollection<any> = this.afs.collection('households');

        console.log(householdColRef.ref.id);

        const data: Household = {
          displayName,
        };

        householdColRef.add(data).then(d => {

          console.log(d.id);

          const privateData: HouseholdPrivateData = {
            members: { }
          };

          privateData.members[user.uid] = 'owner';

          d.collection('private_data').doc('private').set(privateData);
        });
      } else {
        console.log('user not logged in');
      }
    });

  }
}
