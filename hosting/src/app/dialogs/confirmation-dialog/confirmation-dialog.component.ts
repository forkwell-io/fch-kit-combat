import {Component, Inject, OnInit} from '@angular/core';
import {MDC_DIALOG_DATA, MdcDialogRef} from '@angular-mdc/web';

export interface ConfirmationOptions {
  title?: string;
  caption?: string;
  actionPositive?: string;
  actionNegative?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  public title?: string;
  public caption?: string;

  public actionPositive?: string;
  public actionNegative?: string;

  constructor(private ref: MdcDialogRef<ConfirmationDialogComponent>,
              @Inject(MDC_DIALOG_DATA)
              private data: ConfirmationOptions) {
    this.title = data.title;
    this.caption = data.caption;
    this.actionPositive = data.actionPositive;
    this.actionNegative = data.actionNegative;
  }

  ngOnInit(): void {
  }
}
