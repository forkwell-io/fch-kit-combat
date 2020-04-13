import {Component, OnInit} from '@angular/core';
import {RequestItem, RequestObject} from '../../../../@core/firestore-interfaces/request';
import {UserRequestService} from '../../../@backend/user-request.service';

@Component({
  selector: 'app-agency-requests',
  templateUrl: './agency-requests.component.html',
  styleUrls: ['./agency-requests.component.scss']
})
export class AgencyRequestsComponent implements OnInit {
  public requests: RequestObject[] = [];
  public isLoading = true;
  requestsPrecomputed = [];

  constructor(private requestService: UserRequestService) {
    this.refreshContent();
  }

  ngOnInit(): void {
  }

  public asListString(items: RequestItem[]): string {
    return items.map(value => {
      return `${value.qtyNeed - value.qtyFilled} ${value.name}`;
    }).join(', ');
  }

  public delete(request: RequestObject) {
    this.requests.splice(this.requests.indexOf(request), 1);
    return this.requestService.deleteRequest(request.id)
      .finally(() => this.refreshContent());
  }

  public refreshContent() {
    this.requestService.getRequests()
      .then(reqs => {
        this.requestsPrecomputed = [];
        reqs.forEach(request => {
          const icon = this.resolveStatusIcon(request);
          const summary = this.summarizeRequiredItems(request);
          const qtyNeed = this.getCountNeeded(request);
          const qtyFilled = this.getCountFilled(request);
          this.requestsPrecomputed.push({
            request,
            meta: {
              icon,
              summary,
              qtyNeed,
              qtyFilled
            }
          });
        });
      })
      .finally(() => this.isLoading = false);
  }

  resolveStatusIcon(request: RequestObject) {
    switch (request.status) {
      case 'active':
        return 'hourglass_empty';
      case 'complete':
        return 'done_all';
      default:
        return 'home';
    }
  }

  summarizeRequiredItems(request: RequestObject) {
    const maxCount = 2;
    const upperMaxCount = 3;
    const itemNames = request.requestItems.map(item => item.name);
    let value: string;
    if (itemNames.length === 0) {
      value = 'nothing';
    } else if (itemNames.length === 1) {
      value = itemNames.join(', ').toLowerCase();
    } else if (itemNames.length <= upperMaxCount) {
      value = itemNames.slice(0, itemNames.length - 1).join(', ').toLowerCase() + ` and ${itemNames[itemNames.length - 1].toLowerCase()}`;
    } else {
      value = itemNames.slice(0, maxCount).join(', ').toLowerCase() + `, and ${itemNames.length - maxCount} more`;
    }
    return value.replace(/^\w/, letter => letter.toUpperCase());
  }

  getCountNeeded(request: RequestObject) {
    let count = 0;
    request.requestItems.forEach(item => count += +item.qtyNeed);
    return count;
  }

  getCountFilled(request: RequestObject) {
    let count = 0;
    request.requestItems.forEach(item => count += +item.qtyFilled);
    return count;
  }
}
