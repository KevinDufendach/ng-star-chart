import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EditEnvironmentComponent} from './edit-environment/edit-environment.component';
import {EnvironmentsComponent} from './environments/environments.component';

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
    path: 'environments',
    component: EnvironmentsComponent,
  },
  {
    path: 'environment/edit/:id',
    component: EditEnvironmentComponent,
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
