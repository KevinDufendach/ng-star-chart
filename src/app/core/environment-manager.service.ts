import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import {Environment, EnvironmentPrivateData} from './environment';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentManagerService {
  private environment$: Environment;

  constructor(
    private afs: AngularFirestore,
    private appAuth: UserService,
  ) {
    this.appAuth.user$.subscribe( user => {
      if (user && user.defaultEnvironment && !this.isCurrentEnvironment(user.defaultEnvironment)) {
        this.setEnvironment(user.defaultEnvironment);
      }
    });
  }

  private static docRefToEnvironment(doc: QueryDocumentSnapshot<any>): Environment {
    const hh: Environment = doc.data() as Environment;
    hh.id = doc.ref.id;
    return hh;
  }

  private isCurrentEnvironment(envId: string) {
    return (this.environment$ && this.environment$.id === envId);
  }

  get environment(): Environment {
    return this.environment$;
  }

  createEnvironment(displayName: string) {

    this.appAuth.user$.subscribe((user) => {
      if (user) {
        // const environmentCollectionRef: AngularFirestoreCollection<any> = this.afs.collection('environments');
        const newDocId = this.afs.createId();
        const newEnvDoc: AngularFirestoreDocument = this.afs.collection('environments').doc(newDocId);

        const data: Environment = {
          displayName,
          members: [],
          users: [user.uid],
          id: newDocId,
        };

        this.environment$ = data;

        newEnvDoc.set(data).then(d => {
          // Add creator as owner of new environment
          const privateData: EnvironmentPrivateData = {
            roles: {}
          };
          privateData.roles[user.uid] = 'owner';

          newEnvDoc.collection('private_data').doc('private').set(privateData);
        });
      } else {
        console.log('user not logged in');
      }
    });
  }

  setEnvironment(id: string) {
    this.getEnvironment(id).subscribe( environment => {
      if (environment) {
        this.environment$ = environment;
        this.environment$.id = id;
      }
    });

    // this.appAuth.setDefaultEnvironment(id);
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
