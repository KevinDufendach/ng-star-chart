import { Component, OnInit } from '@angular/core';
import {EnvironmentManagerService} from '../core/environment-manager.service';
import {UserService} from '../core/user.service';
import {Environment} from '../core/environment';

@Component({
  selector: 'app-create-environment',
  templateUrl: './create-environment.component.html',
  styleUrls: ['./create-environment.component.scss']
})
export class CreateEnvironmentComponent implements OnInit {
  environments: Array<Environment>;

  constructor(
    public hms: EnvironmentManagerService,
    public appAuth: UserService
  ) { }

  ngOnInit() {
    this.hms.getEnvironmentsByUser('QuxpgpUuZ1ekTNPK05co8ctTeMJ3').subscribe(value => {
      this.environments = value;
    });
  }

  createEnvironment() {
    this.hms.createEnvironment('My Environment');
  }

  editEnvironment() {

  }

  getEnvironments() {
    this.hms.getEnvironmentsByUser('QuxpgpUuZ1ekTNPK05co8ctTeMJ3').subscribe(value => {
      console.log(value);
      this.environments = value;
    });
  }
}
