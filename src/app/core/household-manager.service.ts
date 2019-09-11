import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Household, HouseholdPrivateData} from './household';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseholdManagerService {
  // tslint:disable-next-line:variable-name
  private _householdId: string;
  // tslint:disable-next-line:variable-name
  private _household: Household;

  constructor(
    private afs: AngularFirestore,
    private appAuth: AuthService,
  ) {
  }

  createHousehold(displayName: string) {
    this.appAuth.user$.subscribe((user) => {
      if (user) {
        // const householdCollectionRef: AngularFirestoreCollection<any> = this.afs.collection('households');
        const householdColRef: AngularFirestoreCollection<any> = this.afs.collection('households');

        console.log(householdColRef.ref.id);

        const data: Household = {
          displayName,
          members: [],
        };

        this._household = data;

        householdColRef.add(data).then(d => {
          this._householdId = d.id;

          const privateData: HouseholdPrivateData = {
            roles: {}
          };

          privateData.roles[user.uid] = 'owner';

          d.collection('private_data').doc('private').set(privateData);
        });
      } else {
        console.log('user not logged in');
      }
    });

  }

  get householdId(): string {
    return this._householdId;
  }

  get household(): Household {
    return this._household;
  }

  updateHousehold(id: string, data: Household) {
    const docRef = this.afs.collection('households').doc<Household>(id);

    docRef.set(data);
  }

  // set householdId(value: string) {
  //   this._householdId = value;
  // }
  getHousehold(id: string): Observable<Household> {
    const docRef = this.afs.collection('households').doc<Household>(id);

    return new Observable<Household>(subscriber => {
      docRef.get().subscribe(doc => {
        if (doc.exists) {
          subscriber.next(doc.data() as Household);
        } else {
          subscriber.error(
            'Error getting document'
          );
        }
      });
    });

  }

  getHouseholdsForUser(id: string) {
    const householdsRef = this.afs.collection('households');

    // const query = householdsRef.where()
  }
}
