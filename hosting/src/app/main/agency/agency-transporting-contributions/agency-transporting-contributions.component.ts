import { Component, OnInit } from '@angular/core';
import {ContributionDetails} from '../../../../@core/firestore-interfaces/request';
import {UserContributionService} from '../../../@backend/user-contribution.service';
import {MdcDialog} from '@angular-mdc/web';
import {ContributionDialogComponent} from '../agency-incoming-contributions/contribution-dialog/contribution-dialog.component';

@Component({
  selector: 'app-agency-transporting-contributions',
  templateUrl: './agency-transporting-contributions.component.html',
  styleUrls: ['./agency-transporting-contributions.component.scss']
})
export class AgencyTransportingContributionsComponent implements OnInit {
  public contributions: ContributionDetails[] = [];
  public isLoading = true;

  constructor(
    private service: UserContributionService,
    public dialog: MdcDialog
  ) {
    service.transportingContributions
      .then(value => this.contributions = value)
      .finally(() => this.isLoading = false);
  }

  ngOnInit(): void {
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

  public getCount(request: ContributionDetails): number {
    let count = 0;
    request.contributionItems.forEach(item => count += +item.qty);
    return count;
  }

  showContribution(item: ContributionDetails) {
    this.dialog.open(ContributionDialogComponent, {
      data: item
    });
  }
}
