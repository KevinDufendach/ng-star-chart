import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EditHouseholdComponent} from './edit-household/edit-household.component';

const routes: Routes = [
  {
    path: 'privacy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'household/edit/:id',
    component: EditHouseholdComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
