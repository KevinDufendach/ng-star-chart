import { Component, OnInit } from '@angular/core';
import {HouseholdManagerService} from '../core/household-manager.service';
import {AuthService} from '../core/auth.service';
import {Household} from '../core/household';

@Component({
  selector: 'app-create-household',
  templateUrl: './create-household.component.html',
  styleUrls: ['./create-household.component.scss']
})
export class CreateHouseholdComponent implements OnInit {
  households: Array<Household>;

  constructor(
    public hms: HouseholdManagerService,
    public appAuth: AuthService
  ) { }

  ngOnInit() {
    this.hms.getHouseholdsByUser('QuxpgpUuZ1ekTNPK05co8ctTeMJ3').subscribe(value => {
      this.households = value;
    });
  }

  createHousehold() {
    this.hms.createHousehold('My Household');
  }

  editHousehold() {

  }

  getHouseholds() {
    this.hms.getHouseholdsByUser('QuxpgpUuZ1ekTNPK05co8ctTeMJ3').subscribe(value => {
      console.log(value);
      this.households = value;
    });
  }
}
