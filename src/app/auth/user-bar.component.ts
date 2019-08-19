import { Component} from '@angular/core';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})
export class UserBarComponent {
  canEdit;

  constructor(public auth: AuthService) { }
}
