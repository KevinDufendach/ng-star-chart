import {Component, OnInit} from '@angular/core';
import {EnvironmentManagerService} from '../core/environment-manager.service';
import {UserService} from '../core/user.service';
import {Environment} from '../core/environment';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {
  environments: Array<Environment>;
  userId: string;

  constructor(
    public ems: EnvironmentManagerService,
    public appAuth: UserService
  ) {
  }

  ngOnInit() {
    this.subscribeToUserChanges();
  }

  createEnvironment(environmentName) {
    this.ems.createEnvironment(environmentName);
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
