import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppFirebaseModule} from './app-firebase/app-firebase.module';
import { UserBarComponent } from './auth/user-bar.component';
import {AppAuthModule} from './auth/app-auth.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    PrivacyPolicyComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AppAuthModule,

    AppFirebaseModule,

    MatGridListModule,

    MatCardModule,

    MatMenuModule,

    MatIconModule,

    MatButtonModule,

    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
