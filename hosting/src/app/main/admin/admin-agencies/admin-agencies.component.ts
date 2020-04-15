import {Component, OnInit} from '@angular/core';
import {User} from '../../../../@core/firestore-interfaces/user';
import {AdminUserService} from '../../../@backend/admin-user.service';

@Component({
  selector: 'app-admin-agencies',
  templateUrl: './admin-agencies.component.html',
  styleUrls: ['./admin-agencies.component.scss']
})
export class AdminAgenciesComponent implements OnInit {
  public agencies: User[] = [];
  public isLoading = true;

  constructor(private userService: AdminUserService) {
    userService.getAllAgency()
      .then(agencies => this.agencies = agencies)
      .finally(() => this.isLoading = false);
  }

  ngOnInit(): void {
  }
}
