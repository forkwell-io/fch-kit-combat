import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FirebaseService} from '../../../firebase.service';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {MdcSnackbar} from '@angular-mdc/web';

function matchingPasswords(control1: string, control2: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } | null => {
    const value1 = group.controls[control1].value;
    const value2 = group.controls[control2].value;
    return value1 !== value2 ? {mismatch: true} : null;
  };
}

@Component({
  selector: 'app-finish-email-auth',
  templateUrl: './finish-email-auth.component.html',
  styleUrls: ['./finish-email-auth.component.scss']
})
export class FinishEmailAuthComponent implements OnInit {
  public formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, matchingPasswords('password', 'confirmPassword'));
  public showPassword = false;
  private fullUrl: string;

  constructor(private router: Router, private firebase: FirebaseService, @Inject(DOCUMENT) private document: Document,
              private snackbar: MdcSnackbar) {
    this.fullUrl = document.location.protocol + '//' + document.location.hostname + router.url;
  }

  ngOnInit(): void {
  }

  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  public next() {
    const emailControl = this.formGroup.controls.email;
    const passwordControl = this.formGroup.controls.password;
    const confirmPasswordControl = this.formGroup.controls.confirmPassword;

    const email: string = emailControl.value;
    const password = passwordControl.value;

    emailControl.disable();
    passwordControl.disable();
    confirmPasswordControl.disable();

    return this.firebase.auth()
      .signInWithEmailLink(email, this.fullUrl)
      .then(credential => {
        return credential.user.updatePassword(password);
      })
      .then(_ => {
        return this.router.navigate(['/']);
      })
      .catch(reason => {
        console.error(reason);
        this.snackbar.open('Unknown error occurred');
      })
      .finally(() => {
        emailControl.enable();
        passwordControl.enable();
        confirmPasswordControl.enable();
      });
  }
}
