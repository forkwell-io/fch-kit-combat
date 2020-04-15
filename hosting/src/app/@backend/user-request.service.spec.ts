import { TestBed } from '@angular/core/testing';

import { UserRequestService } from './user-request.service';
import {UserAccount, UserService} from './user.service';
import {AuthService} from '../auth/auth.service';
import {RequestService} from './request.service';
import {RequestContribution} from '../../@core/requestContribution';

describe('UserRequestService', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  let service: UserRequestService;
  let userService: UserService;
  let authService: AuthService;
  let requestService: RequestService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRequestService);
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    requestService = TestBed.inject(RequestService);

    const userAccount: UserAccount = {
      email: 'neuonbox@gmail.com',
      password: '123123'
    };
    await authService.signInWithEmailAndPassword(userAccount.email, userAccount.password);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create request', async () => {
    const _user = await userService.currentUser();
    const user = _user.uid;
    const requestContribution = new RequestContribution({user});
    requestContribution.need('Sterile Water', 2);
    const id = await service.createRequest(requestContribution);
    console.info(id);
    expect(id).toBeTruthy();
  });

  it('get request', async () => {
    const requests = await service.getRequests();
    console.info(requests);
    expect().nothing();
  });

  it('delete request', async () => {
    const requestId = 'xH3eVqsvO3AjOTxvha4n';
    await service.deleteRequest(requestId);
    expect().nothing();
  });

  it('create and update request items', async () => {
    const _user = await userService.currentUser();
    const user = _user.uid;
    const requestContribution = new RequestContribution({user});
    requestContribution.need('Surgical Mask', 10);
    requestContribution.need('Ventilator', 20);
    // requestContribution.changeNeed('Surgical Mask', 5);
    const changedNeed = requestContribution.getNeed('Surgical Mask');
    console.info(requestContribution.request);
    expect(changedNeed.qtyNeed).toBe(5);
  });

  it('find and update request items', async () => {
    const requestId = 'ogjzwNEP0C3IyZCRUFc2';
    const request = await requestService.getRequest(requestId);

    const requestContribution = new RequestContribution(request);

    console.info(requestContribution.requestItems);
    requestContribution.need('Surgical Mask', 200);
    console.info(requestContribution.requestItems);

    try {
      await service.updateRequest(requestContribution);
    } catch (e) {
      console.error(e);
    }

    expect().nothing();
  });

  it('defaultRequestItemNames()', () => {
    console.info(service.defaultRequestItemNames);
    expect().nothing();
  });

  it('requestItemsOverview', async () => {
    const requestItems = await service.requestItemsOverview;
    console.info(requestItems);
    expect().nothing();
  });

  it('incomingContributionsCount', async () => {
    const obs = await service.incomingContributionsCount();
    obs.subscribe(value => {
      console.info(value);
    });
    expect().nothing();
  });

  it('itemsByOtherUsers', async () => {
    const items = await service.itemsByOtherUsers;
    console.info(items);
    expect().nothing();
  });
});
