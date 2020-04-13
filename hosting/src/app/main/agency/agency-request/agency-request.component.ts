import {Component, OnInit} from '@angular/core';
import {ContributionDetails, RequestItem, RequestObject} from '../../../../@core/firestore-interfaces/request';
import {RequestService} from '../../../@backend/request.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRequestService} from '../../../@backend/user-request.service';
import {RequestContribution} from '../../../../@core/requestContribution';
import {MdcDialog, MdcSnackbar} from '@angular-mdc/web';
import {AgencyRequestDeleteDialogComponent} from '../agency-request-delete-dialog/agency-request-delete-dialog.component';
import {UserContributionService} from '../../../@backend/user-contribution.service';

@Component({
  selector: 'app-agency-request',
  templateUrl: './agency-request.component.html',
  styleUrls: ['./agency-request.component.scss']
})
export class AgencyRequestComponent implements OnInit {
  public isLoading = true;
  public isLoadingRequestItems = true;
  public requestedItems: RequestItem[] = [];
  public requestedItemsChart: Array<Array<any>> = [];
  public requestedItemsChartColumns: string[] = ['Item type', 'Received', 'Demands'];
  public chartOptions: google.visualization.BarChartOptions = {
    legend: {position: 'bottom'},
    isStacked: 'absolute',
    colors: ['#03a9f4', '#81d4fa'],
  };
  public sum = 0;
  public filled = 0;
  public progress = 0;
  public isUpdating = false;

  public itemName?: string;
  public itemReceivedCount = 0;
  public itemRequiredCount = 0;

  public itemChart: Array<Array<any>> = [];
  public itemChartColumns: string[] = ['Completed', 'Not completed'];
  public itemOptions: google.visualization.PieChartOptions = {
    legend: 'none',
    colors: ['#03a9f4', '#81d4fa'],
  };
  public currentId: string;
  public currentReq: RequestObject;
  public isDeleting = false;
  public contributions: ContributionDetails[] = [];
  public isLoadingContributions = true;

  constructor(private reqService: RequestService,
              private requestService: UserRequestService,
              private contrib: UserContributionService,
              private snackbar: MdcSnackbar,
              private dialog: MdcDialog,
              private router: Router,
              private route: ActivatedRoute) {
    route.paramMap.subscribe(params => {
      this.currentId = params.get('id');
      this.load();
    });
  }

  ngOnInit(): void {
  }

  public getItem(name: string): RequestItem {
    return this.requestedItems.find(item => {
      return item.name === name;
    });
  }

  public showSpecificItem(name: string) {
    this.clearSpecific();
    const item = this.getItem(name);
    this.itemReceivedCount = item.qtyFilled;
    this.itemRequiredCount = item.qtyNeed;
    this.itemChart.push(['Received', +item.qtyFilled]);
    this.itemChart.push(['Demands', (+item.qtyNeed - item.qtyFilled)]);
    this.itemName = name;
  }

  public update() {
    this.isUpdating = true;
    this.currentReq.requestItems = this.requestedItems;
    this.requestService
      .updateRequest(new RequestContribution(this.currentReq))
      .finally(() => this.reloadData());
  }

  public clearSpecific() {
    this.itemName = null;
    this.itemChart = [];
    this.isUpdating = false;
  }

  public reloadData() {
    this.clearSpecific();
    this.load();
  }

  public summarizeRequiredItems(request: ContributionDetails): string {
    const maxCount = 2;
    const upperMaxCount = 3;
    const itemNames = request.contributionItems.map(item => item.name);
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

  public resolveStatusIcon(request: ContributionDetails): string {
    switch (request.status) {
      case 'waiting':
        return 'hourglass_empty';
      case 'received':
        return 'done_all';
      case 'transporting':
        return 'local_shipping';
      default:
        return 'home';
    }
  }

  public delete() {
    const dialogRef = this.dialog.open(AgencyRequestDeleteDialogComponent, {autoFocus: false});
    dialogRef.afterClosed()
      .subscribe(response => {
        if (response === 'accept') {
          this.clearSpecific();
          if (this.isDeleting) {
            return;
          }
          this.isDeleting = true;
          this.requestService.deleteRequest(this.currentId)
            .then(_ => {
              this.snackbar.open('Request deleted');
              return this.router.navigate(['/agency/requests']);
            })
            .catch(reason => {
              console.error(reason);
              this.snackbar.open('Delete failed');
            })
            .finally(() => this.isDeleting = false);
        }
      });
  }

  public getCount(request: ContributionDetails): number {
    let count = 0;
    request.contributionItems.forEach(item => count += +item.qty);
    return count;
  }

  private load() {
    this.isLoadingRequestItems = true;
    this.requestedItemsChart = [];
    this.loadContributions();
    this.reqService.getRequest(this.currentId)
      .then(request => {
        this.currentReq = request;
        this.requestedItems = request.requestItems.sort((first, second) => {
          return (second.qtyNeed - second.qtyFilled) - (first.qtyNeed - first.qtyFilled);
        });
        this.requestedItems.forEach(item => {
          this.sum += +item.qtyNeed;
          this.filled += +item.qtyFilled;
        });
        if (this.sum > 0) {
          this.progress = Math.floor((this.filled / this.sum) * 100);
        } else {
          this.progress = 0;
        }
        this.requestedItems.forEach(item => {
          this.requestedItemsChart.push([item.name, +item.qtyFilled, (item.qtyNeed - item.qtyFilled)]);
        });
      })
      .finally(() => this.isLoadingRequestItems = false);
  }

  private loadContributions() {
    this.isLoadingContributions = true;
    this.contrib.getContributionsByRequestId(this.currentId)
      .then(value => this.contributions = value)
      .finally(() => this.isLoadingContributions = false);
  }
}
