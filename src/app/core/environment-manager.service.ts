import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot} from '@angular/fire/firestore';
import {Environment, EnvironmentPrivateData} from './environment';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentManagerService {

  constructor(
    private afs: AngularFirestore,
    private appAuth: UserService,
  ) { }

  get environmentId(): string {
    return this._environmentId;
  }

  get environment(): Environment {
    return this._environment;
  }
  // tslint:disable-next-line:variable-name
  private _environmentId: string;
  // tslint:disable-next-line:variable-name
  private _environment: Environment;

  private static docRefToEnvironment(doc: QueryDocumentSnapshot<any>): Environment {
    const hh: Environment = doc.data() as Environment;
    hh.id = doc.ref.id;
    return hh;
  }

  createEnvironment(displayName: string) {
    this.appAuth.user$.subscribe((user) => {
      if (user) {
        // const environmentCollectionRef: AngularFirestoreCollection<any> = this.afs.collection('environments');
        const environmentColRef: AngularFirestoreCollection<any> = this.afs.collection('environments');

        console.log(environmentColRef.ref.id);

        const data: Environment = {
          displayName,
          members: [],
          users: [user.uid]
        };

        this._environment = data;

        environmentColRef.add(data).then(d => {
          this._environmentId = d.id;

          const privateData: EnvironmentPrivateData = {
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

  setEnvironment(id: string) {
    this.getEnvironment(id).subscribe( environment => {
      if (environment) {
        this._environmentId = id;
        this._environment = environment;
      }
    });
  }

  updateEnvironment(id: string, data: Environment) {
    const docRef = this.afs.collection('environments').doc<Environment>(id);

    docRef.set(data);
  }

  getEnvironment(id: string): Observable<Environment> {
    const docRef = this.afs.collection('environments').doc<Environment>(id);

    return new Observable<Environment>(subscriber => {
      docRef.get().subscribe(doc => {
        if (doc.exists) {
          subscriber.next(EnvironmentManagerService.docRefToEnvironment(doc));
        } else {
          subscriber.error(
            'Error getting document'
          );
        }
      });
    });
  }

  getEnvironmentsByUser(id: string): Observable<Array<Environment>> {
    return new Observable<Array<Environment>>( subscriber => {

      const environmentsRef = this.afs.collection('environments');
      const query = environmentsRef.ref.where('users', 'array-contains', id);

      query
        .get()
        .then(querySnapshot => {
          const environments: Array<Environment> = [];

          querySnapshot.forEach( (doc) => {
            environments.push(EnvironmentManagerService.docRefToEnvironment(doc));
          });

          subscriber.next(environments);

          subscriber.complete();
        });
    });
  }
}
