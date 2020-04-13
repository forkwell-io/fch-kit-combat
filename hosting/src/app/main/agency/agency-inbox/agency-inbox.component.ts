import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../../../@backend/message.service';
import {MessageDocument} from '../../../../@core/firestore-interfaces/messages';
import {MdcDialog} from '@angular-mdc/web';
import {MessageDialogComponent} from './message-dialog/message-dialog.component';

@Component({
  selector: 'app-agency-inbox',
  templateUrl: './agency-inbox.component.html',
  styleUrls: ['./agency-inbox.component.scss']
})
export class AgencyInboxComponent implements OnInit {
  isLoading = false;
  messages: MessageDocument[] = [];

  constructor(
    private messageService: MessageService,
    public dialog: MdcDialog
  ) {
    messageService.getMessages()
      .then(value => {
        this.messages = value;
      })
      .catch(e => {
        console.error(e);
      });
  }

  ngOnInit(): void {
  }

  showMessage(item: MessageDocument) {
    this.dialog.open(MessageDialogComponent, {
      data: item
    });
  }
}
