import {Component, OnInit} from '@angular/core';
import {AdminUserService} from '../../../@backend/admin-user.service';
import {User} from '../../../../@core/firestore-interfaces/user';
import {MdcDialog, MdcSnackbar} from '@angular-mdc/web';
import {AdminDeleteUserDialogComponent} from '../admin-delete-user-dialog/admin-delete-user-dialog.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  public users: User[] = [];
  public isLoading = true;

  constructor(private admin: AdminUserService, private dialog: MdcDialog, private snackbar: MdcSnackbar) {
    this.loadUsers();
  }

  ngOnInit(): void {
  }

  public parseRoles(user: User): string {
    if (!user.roles) {
      return '';
    }
    return user.roles.join(', ');
  }

  public loadUsers() {
    this.admin.getAllUser()
      .then(users => this.users = users)
      .finally(() => this.isLoading = false);
  }

  public deleteUser(user: User) {
    const ref = this.dialog.open(AdminDeleteUserDialogComponent, {autoFocus: false});
    ref.afterClosed()
      .subscribe(result => {
        if (result === 'accept') {
          this.users.splice(this.users.indexOf(user), 1);
          return this.admin.deleteUser(user.userId)
            .then(_ => {
              this.snackbar.open('User has been deleted');
            })
            .catch(reason => {
              console.error(reason);
              this.snackbar.open('Unknown error occurred');
            })
            .finally(() => this.loadUsers());
        }
      });
  }
}
