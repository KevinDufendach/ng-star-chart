import { Component, OnInit } from '@angular/core';
import {Household, HouseholdMember} from '../core/household';
import {ActivatedRoute} from '@angular/router';
import {HouseholdManagerService} from '../core/household-manager.service';

@Component({
  selector: 'app-edit-household',
  templateUrl: './edit-household.component.html',
  styleUrls: ['./edit-household.component.scss']
})
export class EditHouseholdComponent implements OnInit {
  id: string;
  household: Household;

  constructor(
    private route: ActivatedRoute,
    private hms: HouseholdManagerService
  ) { }

  ngOnInit() {
    this.getHousehold();
  }

  getHousehold(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.hms.getHousehold(this.id).subscribe(household => {
      console.log('household retrieved');
      this.household = household;
    });
  }

  addHouseholdMember() {
    this.household.members.push({
      displayName: ''
    });
  }

  save() {
    this.hms.updateHousehold(this.id, this.household);
  }

  delete(member: HouseholdMember) {
    const loc = this.household.members.indexOf(member);
    if (loc > -1) {
      this.household.members.splice(loc, 1);
    }
  }
}
