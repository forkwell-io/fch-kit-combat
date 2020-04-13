import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRequestContribComponent } from './card-request-contrib/card-request-contrib.component';
import {MaterialModule} from '../material.module';
import { RequestItemComponent } from './card-request-contrib/request-item/request-item.component';
import {RouterModule} from '@angular/router';
import { LeaveMessageDialogComponent } from './leave-message-dialog/leave-message-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LearnMoreComponent } from './learn-more/learn-more.component';



@NgModule({
  declarations: [CardRequestContribComponent, RequestItemComponent, LeaveMessageDialogComponent, LearnMoreComponent],
  exports: [
    CardRequestContribComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
    ]
})
export class MyComponentsModule { }
