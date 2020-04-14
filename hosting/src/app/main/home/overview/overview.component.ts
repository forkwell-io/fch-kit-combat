import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestItem, RequestObject} from '../../../../@core/firestore-interfaces/request';
import {AgenciesNeedItemResult, StatsService} from '../../../@backend/stats.service';
import {RequestService} from '../../../@backend/request.service';
import {MdcMenu} from '@angular-mdc/web';
import {UserService} from '../../../@backend/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
  joinedAgencies = '—';
  completedRequests = '—';
  activeRequests = '—';
  public currentUserId: string;

  isLoading = true;
  topRequests: RequestObject[] = [
    {user: null}, {user: null}, {user: null}, {user: null}, {user: null}
  ];
  public requestItems: RequestItem[] = [];

  loadingAgencies = true;
  agencies: AgenciesNeedItemResult[] = [];

  constructor(
    private requestService: RequestService,
    public stats: StatsService,
    private userService: UserService,
  ) {
    userService.currentUserInfo().then(user => this.currentUserId = user.userId);
    stats.requestItemsSnapshot.subscribe(items => this.requestItems = items);
    this.reloadData();

    stats.agencyJoined.subscribe(value => {
      this.joinedAgencies = value.toString();
    });

    stats.completeRequest.subscribe(value => {
      this.completedRequests = value.toString();
    });

    stats.activeRequest.subscribe(value => {
      this.activeRequests = value.toString();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  displayAgency(name: string, cardMenu: MdcMenu) {
    cardMenu.open = !cardMenu.open;
    this.loadingAgencies = true;
    this.agencies = [];
    this.stats.getAgenciesNeedItem(name)
      .then(agencies => {
        this.agencies = agencies;
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        this.loadingAgencies = false;
      });
  }

  public reloadData() {
    this.isLoading = true;
    this.requestService.topIncompleteRequests(5).then(value => {
      this.topRequests = value;
    }).catch(e => console.error(e))
      .finally(() => this.isLoading = false);
  }
}
