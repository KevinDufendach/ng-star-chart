import { Component, OnInit } from '@angular/core';
import {HouseholdManagerService} from '../core/household-manager.service';

@Component({
  selector: 'app-create-household',
  templateUrl: './create-household.component.html',
  styleUrls: ['./create-household.component.scss']
})
export class CreateHouseholdComponent implements OnInit {

  constructor(
    private hm: HouseholdManagerService
  ) { }

  ngOnInit() {
  }

  createHousehold() {
    this.hm.createHousehold('My Household');
  }
}
