import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MDC_DIALOG_DATA, MdcDialogRef} from '@angular-mdc/web';
import {MessageDocument} from '../../../../../@core/firestore-interfaces/messages';
import {MessageService} from '../../../../@backend/message.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit, AfterViewInit {
  messageDocument: MessageDocument;

  constructor(
    private messageService: MessageService,
    public dialogRef: MdcDialogRef<MessageDialogComponent>,
    @Inject(MDC_DIALOG_DATA) public data
  ) {
    this.messageDocument = data;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.messageDocument.status === 'unread') {
      this.messageService.markAsRead(this.messageDocument.id);
    }
  }

}
