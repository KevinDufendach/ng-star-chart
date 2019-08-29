import { Component, OnInit } from '@angular/core';
import {EnvironmentManagerService} from '../core/environment-manager.service';
import {UserService} from '../core/user.service';
import {Environment} from '../core/environment';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {
  environments: Array<Environment>;

  constructor(
    public hms: EnvironmentManagerService,
    public appAuth: UserService
  ) { }

  ngOnInit() {
    this.getEnvironments();
  }

  getEnvironments() {
    this.appAuth.user$.subscribe( user => {
      this.hms.getEnvironmentsByUser(user.uid).subscribe(value => {
        this.environments = value;
      });
    });
  }

  createEnvironment() {
    this.hms.createEnvironment('My Environment');
  }

  setEnvironment(id: string) {
    this.hms.setEnvironment(id);
    this.appAuth.setDefaultEnvironment(id);
  }
}
