import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MdcSnackbar} from '@angular-mdc/web';
import {UserService} from '../../@backend/user.service';
import FirebaseError = firebase.FirebaseError;

function matchingPasswords(control1: string, control2: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } | null => {
    const value1 = group.controls[control1].value;
    const value2 = group.controls[control2].value;
    return value1 !== value2 ? {mismatch: true} : null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    }, matchingPasswords('password', 'confirmPassword')
  );
  public showPassword = false;

  constructor(private router: Router, private userService: UserService, private snackbar: MdcSnackbar) {
  }

  ngOnInit(): void {
  }

  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // noinspection DuplicatedCode
  public createUserAccount() {
    const emailControl = this.formGroup.controls.email;
    const passwordControl = this.formGroup.controls.password;
    const confirmPasswordControl = this.formGroup.controls.confirmPassword;
    const email = emailControl.value;
    const password = passwordControl.value;

    const nameControl = this.formGroup.controls.name;
    const contactControl = this.formGroup.controls.contact;
    const addressControl = this.formGroup.controls.address;
    const name = nameControl.value;
    const contact = contactControl.value;
    const address = addressControl.value;

    emailControl.disable();
    passwordControl.disable();
    confirmPasswordControl.disable();
    nameControl.disable();
    contactControl.disable();
    addressControl.disable();

    this.userService.registerAsUser({email, password}, {name, email, address, phone: contact})
      .then(_ => {
        return this.router.navigate(['/']);
      })
      .catch(reason => {
        let message = 'Something went wrong.';
        if ('code' in reason) {
          const code = (reason as FirebaseError).code;
          switch (code) {
            case 'auth/email-already-in-use':
              message = 'Email already in use.';
              break;
            case 'auth/invalid-email':
              message = 'Invalid email.';
              break;
            case 'auth/operation-not-allowed':
              message = 'Email-password authentication disabled.';
              break;
            case 'auth/weak-password':
              message = 'Password too weak.';
              break;
          }
        }
        this.snackbar.open(message);
      })
      .finally(() => {
        emailControl.enable();
        passwordControl.enable();
        confirmPasswordControl.enable();
        nameControl.enable();
        contactControl.enable();
        addressControl.enable();
      });
  }
}
