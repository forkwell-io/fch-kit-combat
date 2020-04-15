import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {MdcSnackbar} from '@angular-mdc/web';
import FirebaseError = firebase.FirebaseError;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  public showPassword = false;

  constructor(private router: Router, private auth: AuthService, private snackbar: MdcSnackbar) {
  }

  ngOnInit(): void {
  }

  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  public signIn() {
    const emailControl = this.formGroup.controls.email;
    const passwordControl = this.formGroup.controls.password;
    const email: string = emailControl.value;
    const password: string = passwordControl.value;
    emailControl.disable();
    passwordControl.disable();
    this.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        if (credential.user) {
          return this.router.navigate(['/']);
        }
      })
      .catch(reason => {
        let message = 'Something went wrong.';
        if ('code' in reason) {
          const code = (reason as FirebaseError).code;
          switch (code) {
            case 'auth/invalid-email':
              message = 'Invalid email.';
              break;
            case 'auth/user-disabled':
              message = 'User not found.';
              break;
            case 'auth/user-not-found':
              message = 'User not found.';
              break;
            case 'auth/wrong-password':
              message = 'Wrong password';
              break;
          }
        }
        this.snackbar.open(message);
      })
      .finally(() => {
        emailControl.enable();
        passwordControl.enable();
      });
  }
}
