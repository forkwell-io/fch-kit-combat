import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../@backend/user.service';
import {User} from '../../../../@core/firestore-interfaces/user';
import {MdcDialog} from '@angular-mdc/web';
import {AgencyProfilePhotoDialogComponent} from '../agency-profile-photo-dialog/agency-profile-photo-dialog.component';

@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.scss']
})
export class AgencyDetailsComponent implements OnInit {
  public isLoading = true;
  public agency: User;

  constructor(service: UserService, private dialog: MdcDialog) {
    service.currentUserInfo()
      .then(user => this.agency = user)
      .finally(() => this.isLoading = false);
  }

  ngOnInit(): void {
  }

  public openProfilePhotoDialog() {
    this.dialog.open(AgencyProfilePhotoDialogComponent, {autoFocus: false})
      .afterClosed()
      .subscribe((result: User | string) => {
        if (result !== 'close') {
          this.agency = result as User;
        }
      });
  }
}
