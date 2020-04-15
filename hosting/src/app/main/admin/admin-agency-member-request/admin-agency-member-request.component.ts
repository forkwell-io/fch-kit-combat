import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {User} from '../../../../@core/firestore-interfaces/user';
import {Observable, Subscription} from 'rxjs';
import {MdcSnackbar} from '@angular-mdc/web';
import {AdminUserService} from '../../../@backend/admin-user.service';

@Component({
  selector: 'app-admin-agency-member-request',
  templateUrl: './admin-agency-member-request.component.html',
  styleUrls: ['./admin-agency-member-request.component.scss']
})
export class AdminAgencyMemberRequestComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public agency: User;
  private userObservable: Observable<User>;
  private subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private adminService: AdminUserService,
              private snackbar: MdcSnackbar) {
    this.userObservable = route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return adminService.getUnverifiedAgencies()
          .then(agencies => agencies.find(item => item.userId === id));
      })
    );
    this.subscription = this.userObservable.subscribe(user => {
      this.agency = user;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public accept(id: string) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    return this.adminService.verifyUser(id)
      .then(() => {
        return this.router.navigate(['/admin/agency-member-requests']);
      })
      .catch(reason => {
        console.error(reason);
        this.snackbar.open('Unknown error occurred');
      })
      .finally(() => this.isLoading = false);
  }

  public reject(id: string) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    return this.adminService.rejectUserApplication(id)
      .then(() => {
        return this.router.navigate(['/admin/agency-member-requests']);
      })
      .catch(reason => {
        console.error(reason);
        this.snackbar.open('Unknown error occurred');
      })
      .finally(() => this.isLoading = false);
  }
}
