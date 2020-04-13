import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminUserService} from '../../@backend/admin-user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  public memberRequestCount: number;
  private subscription: Subscription;

  constructor(private adminService: AdminUserService) {
    this.subscription = adminService.pendingMemberCount
      .subscribe((count: number) => {
        this.memberRequestCount = count;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
