import {Component, OnInit} from '@angular/core';
import {MdcDialogRef} from '@angular-mdc/web';

@Component({
  selector: 'app-admin-delete-user-dialog',
  templateUrl: './admin-delete-user-dialog.component.html',
  styleUrls: ['./admin-delete-user-dialog.component.scss']
})
export class AdminDeleteUserDialogComponent implements OnInit {
  constructor(private _: MdcDialogRef<AdminDeleteUserDialogComponent>) {
  }

  ngOnInit(): void {
  }
}
