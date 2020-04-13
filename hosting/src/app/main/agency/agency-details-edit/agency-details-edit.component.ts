import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../@backend/user.service';
import {User} from '../../../../@core/firestore-interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MdcSnackbar} from '@angular-mdc/web';

@Component({
  selector: 'app-agency-details-edit',
  templateUrl: './agency-details-edit.component.html',
  styleUrls: ['./agency-details-edit.component.scss']
})
export class AgencyDetailsEditComponent implements OnInit {
  public isLoading = true;
  public isUpdating = false;
  public formGroup = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });
  public agency: User;

  constructor(private router: Router, private snackbar: MdcSnackbar, private userService: UserService) {
    userService.currentUserInfo()
      .then(user => {
        this.agency = user;
        this.formGroup.controls.name.setValue(user.name);
        this.formGroup.controls.phone.setValue(user.phone);
        this.formGroup.controls.address.setValue(user.address);
      })
      .finally(() => this.isLoading = false);
  }

  ngOnInit(): void {
  }

  public save() {
    if (this.isUpdating) {
      return;
    }
    this.isUpdating = true;
    const phoneControl = this.formGroup.controls.phone;
    const addressControl = this.formGroup.controls.address;
    const phone: string = phoneControl.value;
    const address: string = addressControl.value;
    phoneControl.disable();
    addressControl.disable();
    this.userService.updateProfile({phone, address})
      .then(_ => {
        this.snackbar.open('Agency information updated');
        return this.router.navigate(['/agency/details']);
      })
      .catch(reason => {
        console.error(reason);
        this.snackbar.open('Unknown error occurred');
      })
      .finally(() => {
        phoneControl.enable();
        addressControl.enable();
        this.isUpdating = false;
      });
  }
}
