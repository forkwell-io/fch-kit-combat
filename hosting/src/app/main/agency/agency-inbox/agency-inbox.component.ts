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
    messageService.getMessagesSnapshot()
      .then(obs => {
        obs.subscribe(value => {
          this.messages = value;
          this.messages.sort((a, b) => {
            if (a.dateCrt > b.dateCrt) {
              return -1;
            } else if (a.dateCrt < b.dateCrt) {
              return 1;
            } else {
              return 0;
            }
          });
        });
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
