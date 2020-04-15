import {Component, Inject, OnInit} from '@angular/core';
import {MessageService} from '../../@backend/message.service';
import {MDC_DIALOG_DATA, MdcDialogRef} from '@angular-mdc/web';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../@backend/user.service';
import {LeaveMessageBuilder} from '../../../@core/leaveMessage';
import {RequestObject} from '../../../@core/firestore-interfaces/request';
import {UserBase} from '../../../@core/firestore-interfaces/user';

@Component({
  selector: 'app-leave-message-dialog',
  templateUrl: './leave-message-dialog.component.html',
  styleUrls: ['./leave-message-dialog.component.scss']
})
export class LeaveMessageDialogComponent implements OnInit {
  messageSent = false;
  loading = true;
  request: RequestObject;

  messageForm = new FormGroup({
    name: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public dialogRef: MdcDialogRef<LeaveMessageDialogComponent>,
    @Inject(MDC_DIALOG_DATA) public data
  ) {
    this.request = data;

    this.userService.currentUserInfo()
      .then(user => {
        if (user) {
          this.messageForm.controls.name.setValue(user.name);
          this.messageForm.controls.name.disable();

          this.messageForm.controls.contact.setValue(user.phone);
          this.messageForm.controls.contact.disable();

          this.messageForm.controls.email.setValue(user.email);
          this.messageForm.controls.email.disable();
        }
      })
      .catch(e => {
      })
      .finally(() => {
        this.loading = false;
      });
  }

  ngOnInit(): void {
  }

  submit() {
    const valid = this.messageForm.valid;
    const c = confirm('Send message?');
    if (valid && c) {
      const user: UserBase = {
        name: this.messageForm.controls.name.value,
        email: this.messageForm.controls.email.value,
        phone: this.messageForm.controls.contact.value,
      };
      const leaveMessageBuilder = new LeaveMessageBuilder(
        this.request.id,
        user,
        this.messageForm.controls.subject.value,
        this.messageForm.controls.message.value
      );
      this.loading = true;
      this.messageService.sendMessage(leaveMessageBuilder)
        .then(() => {
          this.messageSent = true;
        })
        .catch(e => {
          alert('An error has occured');
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
