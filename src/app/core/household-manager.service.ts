import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot} from '@angular/fire/firestore';
import {Household, HouseholdPrivateData} from './household';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseholdManagerService {

  constructor(
    private afs: AngularFirestore,
    private appAuth: AuthService,
  ) { }

  get householdId(): string {
    return this._householdId;
  }

  get household(): Household {
    return this._household;
  }
  // tslint:disable-next-line:variable-name
  private _householdId: string;
  // tslint:disable-next-line:variable-name
  private _household: Household;

  private static docRefToHousehold(doc: QueryDocumentSnapshot<any>): Household {
    const hh: Household = doc.data() as Household;
    hh.id = doc.ref.id;
    return hh;
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
          users: [user.uid]
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

  setHousehold(id: string) {
    this.getHousehold(id).subscribe( household => {
      if (household) {
        this._householdId = id;
        this._household = household;
      }
    });
  }

  updateHousehold(id: string, data: Household) {
    const docRef = this.afs.collection('households').doc<Household>(id);

    docRef.set(data);
  }

  getHousehold(id: string): Observable<Household> {
    const docRef = this.afs.collection('households').doc<Household>(id);

    return new Observable<Household>(subscriber => {
      docRef.get().subscribe(doc => {
        if (doc.exists) {
          subscriber.next(HouseholdManagerService.docRefToHousehold(doc));
        } else {
          subscriber.error(
            'Error getting document'
          );
        }
      });
    });
  }

  getHouseholdsByUser(id: string): Observable<Array<Household>> {
    return new Observable<Array<Household>>( subscriber => {

      const householdsRef = this.afs.collection('households');
      const query = householdsRef.ref.where('users', 'array-contains', id);

      query
        .get()
        .then(querySnapshot => {
          const households: Array<Household> = [];

          querySnapshot.forEach( (doc) => {
            households.push(HouseholdManagerService.docRefToHousehold(doc));
          });

          subscriber.next(households);

          subscriber.complete();
        });
    });
  }
}
