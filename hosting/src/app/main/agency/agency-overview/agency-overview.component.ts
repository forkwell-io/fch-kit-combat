import {Component, OnInit} from '@angular/core';
import {UserRequestService} from '../../../@backend/user-request.service';
import {RequestItem} from '../../../../@core/firestore-interfaces/request';

@Component({
  selector: 'app-agency-overview',
  templateUrl: './agency-overview.component.html',
  styleUrls: ['./agency-overview.component.scss']
})
export class AgencyOverviewComponent implements OnInit {
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

  constructor(private requestService: UserRequestService) {
    requestService.requestItemsOverview
      .then(items => {
        this.requestedItems = items.sort((first, second) => {
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

  ngOnInit(): void {
  }
}
