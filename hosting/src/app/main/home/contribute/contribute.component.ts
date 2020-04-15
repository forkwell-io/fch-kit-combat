import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestService} from '../../../@backend/request.service';
import {ContributionItem, RequestObject} from '../../../../@core/firestore-interfaces/request';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContribsService} from '../../../@backend/contribs.service';
import {UserService} from '../../../@backend/user.service';
import {MdcDialog} from '@angular-mdc/web';
import {ConfirmationDialogComponent, ConfirmationOptions} from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {
  public request: RequestObject;
  public isLoadingRequest = true;
  public formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    note: new FormControl(''),
  });
  public items: ContributionItem[] = [];
  public isPublishing = false;
  private currentId: string;
  public isAutoFilled = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private reqService: RequestService,
              private userService: UserService,
              private contrib: ContribsService,
              private dialog: MdcDialog) {
    route.queryParamMap.subscribe(params => {
      this.currentId = params.get('reqId');
      this.load();
    });
  }

  ngOnInit(): void {
  }

  public load() {
    const nameControl = this.formGroup.controls.name;
    const emailControl = this.formGroup.controls.email;
    const phoneControl = this.formGroup.controls.phone;
    this.userService.currentUserInfo()
      .then(user => {
        if (user) {
          nameControl.setValue(user.name);
          emailControl.setValue(user.email);
          phoneControl.setValue(user.phone);
          nameControl.disable();
          emailControl.disable();
          phoneControl.disable();
          this.isAutoFilled = true;
        } else {
          nameControl.enable();
          emailControl.enable();
          phoneControl.enable();
          this.isAutoFilled = false;
        }
      });
    this.reqService.getRequest(this.currentId)
      .then(request => this.request = request)
      .finally(() => this.isLoadingRequest = false);
  }

  public publish() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {title: 'Publish?', actionNegative: 'Cancel', actionPositive: 'Publish'} as ConfirmationOptions,
        autoFocus: false
      })
      .afterClosed()
      .subscribe(value => {
        if (this.isPublishing || value !== 'positive') {
          return;
        }
        this.isPublishing = true;
        const nameControl = this.formGroup.controls.name;
        const emailControl = this.formGroup.controls.email;
        const phoneControl = this.formGroup.controls.phone;
        const noteControl = this.formGroup.controls.note;
        const name: string = nameControl.value;
        const email: string = emailControl.value;
        const phone: string = phoneControl.value;
        const note: string = noteControl.value;

        nameControl.disable();
        emailControl.disable();
        phoneControl.disable();
        noteControl.disable();

        return this.contrib.contributeToRequest(this.currentId, {
          sender: {name, phone, email},
          contributionItems: this.items,
          remarks: note,
        })
          .then(_ => {
            return this.router.navigate(['/']);
          })
          .finally(() => {
            nameControl.enable();
            emailControl.enable();
            phoneControl.enable();
            noteControl.enable();
            this.isPublishing = false;
          });
      });
  }

  public updateItem(itemName: string, count: number) {
    const item = this.items.find(selected => selected.name === itemName);
    if (item) {
      item.qty = +count;
    } else {
      this.items.push({name: itemName, qty: count});
    }
  }
}
