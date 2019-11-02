import {Component, OnInit} from '@angular/core';
import {EnvironmentManagerService} from '../core/environment-manager.service';
import {UserService} from '../core/user.service';
import {Environment} from '../core/environment';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-create-environment',
  templateUrl: './create-environment.component.html',
  styleUrls: ['./create-environment.component.scss']
})
export class CreateEnvironmentComponent implements OnInit {
  environments: Array<Environment>;
  userId: string;

  constructor(
    public ems: EnvironmentManagerService,
    public appAuth: UserService
  ) {
  }

  ngOnInit() {
    this.subscribeToUserChanges();

    // const userId = 'QuxpgpUuZ1ekTNPK05co8ctTeMJ3';
    // console.log('getting environments for userId: ' + userId);
    // this.ems.getEnvironmentsByUser(userId).subscribe(value => {
    //   this.environments = value;
    // });
  }

  createEnvironment(environmentName) {
    this.ems.createEnvironment(environmentName);
  }

  editEnvironment() {

  }

  setEnvironment(id: string) {
    this.ems.setEnvironment(id);
    this.appAuth.setDefaultEnvironment(id);
  }

  private subscribeToUserChanges() {
    this.appAuth.userId$.subscribe(uid => {
      this.ems.getEnvironmentsByUser(uid).pipe(first()).subscribe( envs => {
        this.environments = envs;
      });
    });
  }
}
