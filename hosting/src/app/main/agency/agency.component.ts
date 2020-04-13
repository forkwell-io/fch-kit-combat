import {Component, OnInit} from '@angular/core';
import {UserRequestService} from '../../@backend/user-request.service';
import {MessageService} from '../../@backend/message.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  public inboxUnreadCount = 0;
  public incomingContributionCount = 0;

  constructor(
    private requestService: UserRequestService,
    private messageService: MessageService
  ) {
    messageService.unreadMessagesCount().then(observable => {
      observable.subscribe(count => this.inboxUnreadCount = count);
    });
    requestService.incomingContributionsCount()
      .then(observable => {
        observable.subscribe(count => this.incomingContributionCount = count);
      });
  }

  ngOnInit(): void {
  }
}
