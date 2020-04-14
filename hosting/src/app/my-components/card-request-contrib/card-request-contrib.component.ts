import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RequestItem, RequestObject} from '../../../@core/firestore-interfaces/request';
import {MdcDialog} from '@angular-mdc/web';
import {LeaveMessageDialogComponent} from '../leave-message-dialog/leave-message-dialog.component';
import {ConfirmationDialogComponent, ConfirmationOptions} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {UserRequestService} from '../../@backend/user-request.service';

@Component({
  selector: 'app-card-request-contrib',
  templateUrl: './card-request-contrib.component.html',
  styleUrls: ['./card-request-contrib.component.scss']
})
export class CardRequestContribComponent implements OnInit {
  @Input() mini = false;
  @Input() currentUserId?: string;
  @Input() requestObject: RequestObject;
  emptyRequestItem: RequestItem = {
    name: '—',
    qtyFilled: 0,
    qtyNeed: 0
  };

  private _viewAll = false;
  itemProgress = '0';
  imgUrl = '';
  @Output()
  public updated = new EventEmitter<boolean>();

  imgUrls = {
    Ra2HX9HXLNQhg62ciBhQXO17IsD3: './assets/dummy-images/1200px-Kuala_Lumpur_Hospital.jpg',
    zjNFhfMvM9h2SsLPazwius5YWGS2: './assets/dummy-images/120319 CaroMont Regional Medical Center 712.jpg',
    uFkBX9ZaHwQFER9zFIrSNbCc9xf2: './assets/dummy-images/cleveland-clinic-florida-wellington.jpg',
    zO8pqEXZTKNO0Qo8RFfBHALrPQM2: './assets/dummy-images/photo-1519494026892-80bbd2d6fd0d.jpg',
    '46x8Ydl8uYf4VMCVtvIaKQzvrSO2': './assets/dummy-images/ming.jpg'
  };
  progressBarValue = 0;

  constructor(
    private dialog: MdcDialog,
    private requestService: UserRequestService,
  ) {
  }

  get viewAll(): boolean {
    return this._viewAll;
  }

  set viewAll(value: boolean) {
    this._viewAll = value;
  }

  toggleViewAll() {
    this.viewAll = !this.viewAll;
  }

  ngOnInit(): void {
    const progress = this.getProgress(this.requestObject);
    this.itemProgress = (progress * 100).toFixed(2) || '0';
    this.progressBarValue = progress;
    // this.imgUrl = this.imgUrls[this.requestObject.user] || '';
    const userId = this.requestObject.user;
    this.imgUrl = `https://firebasestorage.googleapis.com/v0/b/neuon-hackathon-holmes.appspot.com/o/userImages%2F${userId}?alt=media`;
  }


  public getProgress(request: RequestObject): number {
    let received = 0;
    let required = 0;
    if (request && request.requestItems) {
      request.requestItems.forEach(item => {
        received += +item.qtyFilled;
        required += +item.qtyNeed;
      });
    }
    return received / required;
  }


  leaveMessageDialog(requestObject: RequestObject) {
    this.dialog.open(LeaveMessageDialogComponent, {
      data: requestObject
    });
  }

  public markAsCompleted(id: string) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Mark as completed?',
        caption: 'This action is irreversible.',
        actionPositive: 'Mark as complete',
        actionNegative: 'Cancel'
      } as ConfirmationOptions
    }).afterClosed()
      .subscribe(result => {
        if (result === 'positive') {
          return this.requestService
            .markRequestAsComplete(id)
            .finally(() => this.updated.emit(true));
        }
      });
  }
}
