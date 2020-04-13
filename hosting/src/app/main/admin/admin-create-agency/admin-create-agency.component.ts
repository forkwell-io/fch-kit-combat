import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MdcSnackbar} from '@angular-mdc/web';
import {AdminUserService} from '../../../@backend/admin-user.service';

@Component({
  selector: 'app-admin-create-agency',
  templateUrl: './admin-create-agency.component.html',
  styleUrls: ['./admin-create-agency.component.scss']
})
export class AdminCreateAgencyComponent implements OnInit {
  // noinspection DuplicatedCode
  public formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    }
  );
  public created = false;

  constructor(private router: Router,
              private userService: AdminUserService,
              private snackbar: MdcSnackbar) {
  }

  ngOnInit(): void {
  }

  // noinspection DuplicatedCode
  public createUserAccount() {
    const emailControl = this.formGroup.controls.email;
    const email = emailControl.value;

    const nameControl = this.formGroup.controls.name;
    const contactControl = this.formGroup.controls.contact;
    const addressControl = this.formGroup.controls.address;
    const name = nameControl.value;
    const contact = contactControl.value;
    const address = addressControl.value;

    emailControl.disable();
    nameControl.disable();
    contactControl.disable();
    addressControl.disable();
    this.userService.createAgency(email, {name, email, address, phone: contact})
      .then(_ => {
        this.created = true;
      })
      .catch(_ => {
        const message = 'Something went wrong.';
        this.snackbar.open(message);
      })
      .finally(() => {
        emailControl.enable();
        nameControl.enable();
        contactControl.enable();
        addressControl.enable();
      });
  }
}
