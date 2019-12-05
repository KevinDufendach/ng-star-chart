import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserBarComponent} from './user-bar.component';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';

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
        MatButtonModule,
        MatIconModule,
        RouterModule,
        FlexLayoutModule
    ]
})
export class AppAuthModule { }
