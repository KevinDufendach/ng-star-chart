import { Component, OnInit } from '@angular/core';
import {Environment, EnvironmentMember} from '../core/environment';
import {ActivatedRoute} from '@angular/router';
import {EnvironmentManagerService} from '../core/environment-manager.service';

@Component({
  selector: 'app-edit-environment',
  templateUrl: './edit-environment.component.html',
  styleUrls: ['./edit-environment.component.scss']
})
export class EditEnvironmentComponent implements OnInit {
  id: string;
  environment: Environment;

  constructor(
    private route: ActivatedRoute,
    private hms: EnvironmentManagerService
  ) { }

  ngOnInit() {
    this.getEnvironment();
  }

  getEnvironment(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.hms.getEnvironment(this.id).subscribe(environment => {
      console.log('environment retrieved');
      this.environment = environment;
    });
  }

  addEnvironmentMember() {
    this.environment.members.push({
      displayName: ''
    });
  }

  save() {
    this.hms.updateEnvironment(this.id, this.environment);
  }

  delete(member: EnvironmentMember) {
    const loc = this.environment.members.indexOf(member);
    if (loc > -1) {
      this.environment.members.splice(loc, 1);
    }
  }
}
