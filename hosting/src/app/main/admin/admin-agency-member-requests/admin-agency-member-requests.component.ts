import {Component, OnInit} from '@angular/core';
import {User} from '../../../../@core/firestore-interfaces/user';
import {AdminUserService} from '../../../@backend/admin-user.service';

@Component({
  selector: 'app-admin-agency-member-requests',
  templateUrl: './admin-agency-member-requests.component.html',
  styleUrls: ['./admin-agency-member-requests.component.scss']
})
export class AdminAgencyMemberRequestsComponent implements OnInit {
  public agencies: User[] = [];
  public isLoading = true;

  constructor(private adminService: AdminUserService) {
    adminService.getUnverifiedAgencies()
      .then(agencies => this.agencies = agencies)
      .finally(() => this.isLoading = false);
  }

  ngOnInit(): void {
  }
}
