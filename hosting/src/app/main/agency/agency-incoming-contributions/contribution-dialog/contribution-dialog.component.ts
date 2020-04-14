import {Component, Inject, OnInit} from '@angular/core';
import {MessageService} from '../../../../@backend/message.service';
import {MDC_DIALOG_DATA, MdcDialogRef} from '@angular-mdc/web';
import {ContributionDetails, ContributionStatus, RequestObject} from '../../../../../@core/firestore-interfaces/request';
import {RequestService} from '../../../../@backend/request.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserContributionService} from '../../../../@backend/user-contribution.service';

interface ItemTransaction {
  name: string;
  qtyNeed: number;
  qtyContributed: number;
  qtyReceived: number;
};

interface ContributionDialogParams extends ContributionDetails{
  readOnly: boolean;
}

@Component({
  selector: 'app-contribution-dialog',
  templateUrl: './contribution-dialog.component.html',
  styleUrls: ['./contribution-dialog.component.scss']
})
export class ContributionDialogComponent implements OnInit {
  showMainContent = false;
  loading = true;
  request: RequestObject;
  contributionDetails: ContributionDialogParams;
  readOnly = false;
  buttonText = 'Confirm';

  contributionStatuses = [
    'transporting',
    'received',
  ];

  contributionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private requestService: RequestService,
    private userContributionService: UserContributionService,
    @Inject(MDC_DIALOG_DATA) public data
  ) {
    this.contributionDetails = data;
    if (this.contributionDetails.readOnly) {
      this.readOnly = this.contributionDetails.readOnly;
    }

    this.contributionForm = this.fb.group({
      status: this.contributionDetails.status,
      items: this.fb.array(<ItemTransaction[]> []),
    });

    requestService.getRequest(this.contributionDetails.requestId)
      .then(value => {
        const items = this.contributionDetails.contributionItems;
        const itemsReceived = this.contributionDetails.contributionItemsReceived;

        value.requestItems.forEach(item => {
          let qtyContributed = 0;
          const itemContributed = items.find(itemContributed => {
            return itemContributed.name === item.name;
          });
          if (itemContributed) {
            qtyContributed = itemContributed.qty;

            let qtyReceived = 0;
            if (itemsReceived) {
              const itemReceived = itemsReceived.find(itemReceived => {
                return itemReceived.name === item.name;
              });
              if (itemReceived) {
                qtyReceived = itemReceived.qty;
              }
            }

            const itemTransaction = {
              name: item.name,
              qtyNeed: item.qtyNeed,
              qtyContributed,
              qtyReceived: [qtyReceived, [Validators.min(0), Validators.max(qtyContributed)]]
            };
            const formGroup = this.fb.group(itemTransaction);
            if (this.readOnly) {
              formGroup.disable();
            }
            this.items.push(formGroup);
          }
        });

        this.request = value;
      })
      .catch(e => {
      })
      .finally(() => {
        this.loading = false;
        this.showMainContent = true;
      });
  }

  get items(): FormArray {
    return this.contributionForm.get('items') as FormArray;
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.contributionForm.valid) {
      const rawValues = this.contributionForm.getRawValue();

      this.loading = true;
      const itemsReceived = [];
      rawValues.items.forEach(item => {
        itemsReceived.push({
          name: item.name,
          qty: item.qtyReceived
        });
      });

      if (rawValues.status === <ContributionStatus> 'received') {
        this.userContributionService.receiveContribution(
          this.contributionDetails.id,
          {
            items: itemsReceived
          }
        )
          .then(() => {
            alert('Item received');
            this.loading = false;
          });
      } else if (rawValues.status === <ContributionStatus> 'transporting') {
        this.userContributionService.transportContribution(
          this.contributionDetails.id,
          {
            items: itemsReceived
          }
        )
          .then(() => {
            alert('Item in transport');
            this.loading = false;
          });
      } else {
        alert('Please select either you want to Transport or Receive the item');
        this.loading = false;
      }
    }
  }

  onQtyReceivedChange($event: any, item: AbstractControl) {
    if (!item.valid) {
      item.get('qtyReceived').setValue(item.get('qtyContributed').value);
    }
  }
}
