import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../core/user.service';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})
export class UserBarComponent {
  @Input() showMenuBar: boolean;
  @Output() menuButtonClick = new EventEmitter<null>();

  canEdit;

  _notifyMenuClicked() {
    this.menuButtonClick.emit();
  }


  constructor(public auth: UserService) { }
}
