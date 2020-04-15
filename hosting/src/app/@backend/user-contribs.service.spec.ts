import { TestBed } from '@angular/core/testing';

import { UserContributionService } from './user-contribution.service';
import {AuthService} from '../auth/auth.service';
import {UserAccount} from './user.service';

describe('UserContribsService', () => {
  let service: UserContributionService;
  let authService: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserContributionService);
    authService = TestBed.inject(AuthService);

    const userAccount: UserAccount = {
      email: 'neuonbox@gmail.com',
      password: '123123'
    };
    await authService.signInWithEmailAndPassword(userAccount.email, userAccount.password);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('waitingContributions', async () => {
    const contribs = await service.waitingContributions;
    console.info(contribs);
    expect().nothing();
  });

  it('receivedContributions', async () => {
    const contribs = await service.receivedContributions;
    console.info(contribs);
    expect().nothing();
  });

  it('receiveContribution', async () => {
    const contribId = '7XP6UpbwVI9AtSoqJRkU';
    await service.receiveContribution(contribId, {
      items: [
        {
          name: 'Blanket',
          qty: 10
        }
      ]
    });
    expect().nothing();
  });

  it('getContributionsByRequestId', async () => {
    const contribs = await service.getContributionsByRequestId('EHClufIkf0p8n7iiOYs5');
    console.info(contribs[0].sender);
    expect().nothing();
  });
});
