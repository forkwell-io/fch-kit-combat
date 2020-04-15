import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {MaterialModule} from '../material.module';


@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class DialogsModule {
}
