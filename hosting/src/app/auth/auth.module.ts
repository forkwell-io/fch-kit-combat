import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SignUpComponent} from './sign-up/sign-up.component';
import {MaterialModule} from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
  ],
  exports: [
    AuthComponent,
  ]
})
export class AuthModule {
}
