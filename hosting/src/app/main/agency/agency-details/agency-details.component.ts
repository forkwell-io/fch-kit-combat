import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../@backend/user.service';
import {User} from '../../../../@core/firestore-interfaces/user';

@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.scss']
})
export class AgencyDetailsComponent implements OnInit {
  public isLoading = true;
  public agency: User;

  constructor(service: UserService) {
    service.currentUserInfo()
      .then(user => this.agency = user)
      .finally(() => this.isLoading = false);
  }

  ngOnInit(): void {
  }

}
