import {Request, RequestItem, RequestObject} from './firestore-interfaces/request';

export class RequestContribution {
  _request: Request;
  _requestItems: RequestItem[] = [];
  _requestObject: RequestObject;

  constructor(params: RequestObject) {
    this._requestObject = params;
    this._requestItems = params.requestItems || [];

    this._request = params;
  }

  need(name: string, qtyNeed: number = 0): void {
    const index = this._requestItems.findIndex(value => {
      return value.name === name;
    });
    if (index >= 0) {
      this._requestItems[index].qtyNeed = qtyNeed;
    } else {
      this._requestItems.push({
          name,
          qtyNeed,
          qtyFilled: 0
      });
    }
  }

  deleteNeed(name: string): void {
    const item = this._requestItems.find(value => {
      return value.name === name;
    });
    const index = this._requestItems.indexOf(item);
    if (index >= 0) {
      this._requestItems.splice(index, 1);
    }
  }

  getNeed(name: string): RequestItem {
    const item = this._requestItems.find(value => {
      return value.name === name;
    });
    return item as RequestItem;
  }

  get id(): string {
    return this._requestObject.id;
  }

  get request(): Request {
    const _request = this._request;
    return {
      user: _request.user,
      userInfo: {
        name: '',
        email: ''
      }
    };
  }

  get requestItems(): RequestItem[] {
    return this._requestItems;
  }
}
