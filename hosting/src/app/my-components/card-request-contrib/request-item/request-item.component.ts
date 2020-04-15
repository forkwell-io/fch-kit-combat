import {Component, Input, OnInit} from '@angular/core';
import {RequestItem} from '../../../../@core/firestore-interfaces/request';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss']
})
export class RequestItemComponent implements OnInit {
  @Input() requestItem: RequestItem;

  constructor() { }

  ngOnInit(): void {
  }

}
