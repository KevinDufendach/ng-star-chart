import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import {Environment, EnvironmentPrivateData} from './environment';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentManagerService {
  private activeEnvironment: Environment;
  private userId: string;

  constructor(
    private afs: AngularFirestore,
    private appAuth: UserService,
  ) {
    this.subscribeToUserChanges();

    // this.appAuth.user$.subscribe( user => {
    //   if (user && user.defaultEnvironment && !this.isCurrentEnvironment(user.defaultEnvironment)) {
    //     this.setEnvironment(user.defaultEnvironment);
    //   }
    // });
  }

  private static docRefToEnvironment(doc: QueryDocumentSnapshot<any>): Environment {
    const hh: Environment = doc.data() as Environment;
    hh.id = doc.ref.id;
    return hh;
  }

  private isCurrentEnvironment(envId: string) {
    return (this.activeEnvironment && this.activeEnvironment.id === envId);
  }

  get environment(): Environment {
    return this.activeEnvironment;
  }

  private subscribeToUserChanges() {
    this.appAuth.user$.subscribe(user => {
      if (user && user.uid !== this.userId) {
        this.userId = user.uid;

        console.log('Env SVC: user login/change detected. ' + user.uid);
        this.setEnvironment(user.defaultEnvironment);
      }
    });
  }

  // retrieveUserEnvironments(user: AppUser): Observable<Environment[]> {
  //   return new Observable<Environment[]>(subscriber => {
  //     this.getEnvironmentsByUser(user.uid).subscribe(envs => {
  //       this.environments = envs;
  //       subscriber.next(this.environments);
  //     });
  //   });
  // }

  createEnvironment(displayName: string): Observable<Environment> {
    return new Observable<Environment>(subscriber => {

      // pipe(first... gets the first user piped in, then unsubscribes
      this.appAuth.user$.pipe(first(user => (user !== null))).subscribe((user) => {
        // const environmentCollectionRef: AngularFirestoreCollection<any> = this.afs.collection('environments');
        const newDocId = this.afs.createId();
        const newEnvDoc: AngularFirestoreDocument = this.afs.collection('environments').doc(newDocId);

        const data: Environment = {
          displayName,
          members: [],
          users: [user.uid],
          id: newDocId,
        };

        this.activeEnvironment = data;

        newEnvDoc.set(data).then(d => {
          // Add creator as owner of new environment
          const privateData: EnvironmentPrivateData = {
            roles: {}
          };
          privateData.roles[user.uid] = 'owner';

          newEnvDoc.collection('private_data').doc('private').set(privateData);
        });

        subscriber.next(this.activeEnvironment);
      });

    });
  }

  setEnvironment(id: string) {
    this.getEnvironment(id).subscribe( environment => {
      if (environment) {
        this.activeEnvironment = environment;
        this.activeEnvironment.id = id;
      }

      // console.log('setting environment');
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
            // TODO: Need to secure cloud firestore rules so can only get env if user
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

  hasEnvironment(id: string) {
    return false;
  }
}
