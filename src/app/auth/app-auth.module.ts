import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserBarComponent} from './user-bar.component';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [
    UserBarComponent,
  ],
  exports: [
    UserBarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexModule,
    MatButtonModule
  ]
})
export class AppAuthModule { }
