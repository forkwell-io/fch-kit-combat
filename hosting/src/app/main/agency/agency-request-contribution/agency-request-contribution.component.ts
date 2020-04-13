import {Component, OnInit} from '@angular/core';
import {User} from '../../../../@core/firestore-interfaces/user';
import {UserService} from '../../../@backend/user.service';
import {RequestItem} from '../../../../@core/firestore-interfaces/request';
import {UserRequestService} from '../../../@backend/user-request.service';
import {RequestContribution} from '../../../../@core/requestContribution';
import {MdcSnackbar} from '@angular-mdc/web';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agency-request-contribution',
  templateUrl: './agency-request-contribution.component.html',
  styleUrls: ['./agency-request-contribution.component.scss']
})
export class AgencyRequestContributionComponent implements OnInit {
  public agency: User;
  public isLoading = true;
  public isPublishing = false;
  public itemRequests: RequestItem[] = [];

  public availableItems: string[] = [];
  public addedItems: string[] = [];

  public isLoadingCustomItems = true;
  public customItems: string[] = [];

  public currentCustomInput = '';
  public isPublishAllowed = false;

  public newRequest: RequestContribution;

  constructor(private router: Router,
              private userService: UserService,
              private requestService: UserRequestService,
              private snackbar: MdcSnackbar) {
    userService.currentUserInfo()
      .then(agency => {
        this.agency = agency;
        this.newRequest = new RequestContribution({user: agency.userId});
      })
      .finally(() => this.isLoading = false);
    this.availableItems.push(...requestService.defaultRequestItemNames);
    this.availableItems = this.availableItems.sort();

    this.requestService.itemsByOtherUsers
      .then(items => {
        this.availableItems.push(...items);
        this.availableItems = this.availableItems.sort();
      })
      .finally(() => this.isLoadingCustomItems = false);
  }

  ngOnInit(): void {
  }

  public add(item: string) {
    item = item.trim();
    if (item === '') {
      return;
    }
    if (this.addedItems.indexOf(item) > -1) {
      return;
    }
    if (this.availableItems.indexOf(item) > -1) {
      this.availableItems.splice(this.availableItems.indexOf(item), 1);
    }
    this.addedItems.push(item);
    this.itemRequests.push({name: item, qtyFilled: 0, qtyNeed: 0});
    this.availableItems = this.availableItems.sort();
  }

  public remove(request: RequestItem) {
    this.addedItems.splice(this.addedItems.indexOf(request.name), 1);
    if (this.availableItems.indexOf(request.name) < 0) {
      this.availableItems.push(request.name);
    }
    this.itemRequests.splice(this.itemRequests.indexOf(request), 1);
    this.availableItems = this.availableItems.sort();
    this.resolvePublishIsAllowed();
  }

  public addCustom(item: string) {
    this.add(item);
  }

  public addFromInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addCustom(this.currentCustomInput);
    }
  }

  public onCustomInput(value: string) {
    this.currentCustomInput = value;
  }

  public updateItem(item: RequestItem, count: number) {
    item.qtyNeed = count;
    this.resolvePublishIsAllowed();
  }

  public resolvePublishIsAllowed() {
    if (this.itemRequests.length === 0) {
      return this.isPublishAllowed = false;
    }
    const summaryItem = this.itemRequests.reduce((previousValue, currentValue) => {
      return {name: '', qtyNeed: previousValue.qtyNeed + currentValue.qtyNeed, qtyFilled: 0};
    });
    this.isPublishAllowed = summaryItem.qtyNeed > 0;
  }

  public publish() {
    if (this.isPublishing) {
      return;
    }
    this.isPublishing = true;
    this.itemRequests.forEach((req) => {
      this.newRequest.need(req.name, req.qtyNeed);
    });
    return this.requestService.createRequest(this.newRequest)
      .then(_ => {
        this.snackbar.open('Request published');
        return this.router.navigate(['/agency']);
      })
      .catch(reason => {
        console.error(reason);
        return this.snackbar.open('Unknown error occurred');
      })
      .finally(() => {
        this.isPublishing = false;
      });
  }
}
