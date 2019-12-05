import { Injectable } from '@angular/core';
import {UserService} from './core/user.service';
import {EnvironmentManagerService} from './core/environment-manager.service';

@Injectable({
  providedIn: 'root'
})
export class StarChartService {


  constructor(
    private userService: UserService,
    private envService: EnvironmentManagerService
  ) {

  }


}
