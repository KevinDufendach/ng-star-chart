import {Component, OnInit} from '@angular/core';
import {first, map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {EnvironmentManagerService} from '../core/environment-manager.service';
import {UserService} from '../core/user.service';
import {Environment} from '../core/environment';

@Component({
  selector: 'app-environment-dashboard',
  templateUrl: './environment-dashboard.component.html',
  styleUrls: ['./environment-dashboard.component.scss']
})
export class EnvironmentDashboardComponent implements OnInit {
  environments: Array<Environment>;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Card 1', cols: 1, rows: 1},
          {title: 'Card 2', cols: 1, rows: 1},
          {title: 'Card 3', cols: 1, rows: 1},
          {title: 'Card 4', cols: 1, rows: 1}
        ];
      }

      return [
        {title: 'Card 1', cols: 2, rows: 1},
        {title: 'Card 2', cols: 1, rows: 1},
        {title: 'Card 3', cols: 1, rows: 2},
        {title: 'Card 4', cols: 1, rows: 1}
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private ems: EnvironmentManagerService,
    private appAuth: UserService) {
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
