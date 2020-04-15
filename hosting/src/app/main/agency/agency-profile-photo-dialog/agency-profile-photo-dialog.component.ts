import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../@backend/user.service';
import {MdcDialogRef} from '@angular-mdc/web';

@Component({
  selector: 'app-agency-profile-photo-dialog',
  templateUrl: './agency-profile-photo-dialog.component.html',
  styleUrls: ['./agency-profile-photo-dialog.component.scss']
})
export class AgencyProfilePhotoDialogComponent implements OnInit {
  public isUploading = false;
  public droppedFile?: File;

  constructor(private userService: UserService, private dialogRef: MdcDialogRef<AgencyProfilePhotoDialogComponent>) {
  }

  ngOnInit(): void {
  }

  public onFileDropped(file: File) {
    if (!file.type.match(/image\/*/)) {
      console.error('Only image file is supported');
      return;
    }
    this.droppedFile = file;
  }

  public onFilePicked(event: Event) {
    const attr = 'files';
    const files: FileList = event.target[attr];
    if (files.length > 0) {
      this.onFileDropped(files.item(0));
    }
  }

  public upload() {
    if (this.isUploading || !this.droppedFile) {
      return;
    }
    this.isUploading = true;
    this.userService.uploadUserPhoto(this.droppedFile)
      .then(_ => this.userService.currentUserInfo())
      .then(user => this.dialogRef.close(user))
      .finally(() => this.isUploading = false);
  }
}
