import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../../@backend/request.service';
import {RequestObject} from '../../../../@core/firestore-interfaces/request';

@Component({
  selector: 'app-agencies',
  templateUrl: './public-requests.component.html',
  styleUrls: ['./public-requests.component.scss']
})
export class PublicRequestsComponent implements OnInit {
  public isLoadingRequests = true;
  public requests: RequestObject[] = [];

  constructor(service: RequestService) {
    service.getRequests()
      .then(requests => this.requests = requests)
      .finally(() => this.isLoadingRequests = false);
  }

  ngOnInit(): void {
  }

  public summarizeRequiredItems(request: RequestObject): string {
    const maxCount = 2;
    const upperMaxCount = 3;
    const itemNames = request.requestItems.map(item => item.name);
    if (itemNames.length === 0) {
      return 'nothing';
    } else if (itemNames.length === 1) {
      return itemNames.join(', ').toLowerCase();
    } else if (itemNames.length <= upperMaxCount) {
      return itemNames.slice(0, itemNames.length - 1).join(', ').toLowerCase() + ` and ${itemNames[itemNames.length - 1].toLowerCase()}`;
    } else {
      return itemNames.slice(0, maxCount).join(', ').toLowerCase() + `, and ${itemNames.length - maxCount} more`;
    }
  }

  public getProgress(request: RequestObject): string {
    let received = 0;
    let required = 0;
    request.requestItems.forEach(item => {
      received += +item.qtyFilled;
      required += +item.qtyNeed;
    });
    return Math.floor(received / required * 100).toString() + '%';
  }
}
