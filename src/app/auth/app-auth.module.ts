import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserBarComponent} from './user-bar.component';
import {MatToolbarModule} from '@angular/material';



@NgModule({
  declarations: [
    UserBarComponent,
  ],
  exports: [
    UserBarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ]
})
export class AppAuthModule { }
