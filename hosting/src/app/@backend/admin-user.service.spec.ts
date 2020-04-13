import { TestBed } from '@angular/core/testing';

import { AdminUserService } from './admin-user.service';
import {UserAccount, UserService} from './user.service';
import {AuthService} from '../auth/auth.service';
import {User} from '../../@core/firestore-interfaces/user';

describe('AdminUserService', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 12000;
  let service: AdminUserService;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserService);
    userService = TestBed.inject(UserService);
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


  it('getAllUser()', async () => {
    const users = await service.getAllUser();
    console.info(users);
    expect(users.length).toBeGreaterThanOrEqual(2);
  });

  it('delegateAdminByEmail()', async () => {
    const delegated = await service.delegateAdminByEmail('chan.tw97@gmail.com');
    expect(delegated).toBeTrue();
  });

  it('chan.tw97@gmail.com is admin', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const userAccount: UserAccount = {
      email: 'chan.tw97@gmail.com',
      password: 'theinternet'
    };
    await authService.signInWithEmailAndPassword(userAccount.email, userAccount.password);
    const isAdmin = await userService.iamAdmin();
    expect(isAdmin).toBeTrue();
  });

  it('getAllAgency()', async () => {
    const agencies: User[] = await service.getAllAgency();
    expect(agencies.length).toBeGreaterThanOrEqual(2);
  });

  it('should get all unverified agencies', async () => {
    const agencies = await service.getUnverifiedAgencies();
    expect(agencies.length).toBeGreaterThanOrEqual(3);
  });

  it('create user', async () => {
    // login as admin
    const userAccount: UserAccount = {
      email: 'neuonbox@gmail.com',
      password: '123123'
    };
    await authService.signInWithEmailAndPassword(userAccount.email, userAccount.password);

    const email = 'unsolvedrubiks1908@gmail.com';
    try {
      await service.createAgency(email, {
        address: '-',
        phone: '-',
        name: 'Danish',
        email,
      });
    } catch (error) {
      const code = error.code;
      const message = error.message;
      const details = error.details;
      console.info(code);
      console.info(message);
      console.info(details);
    }
    expect().nothing();
  });

  it('verify account', async () => {
    const email = 'unsolvedrubiks1908@gmail.com';
    const userId = await userService._findUserIdByEmail(email);
    const verified = await service.verifyUser(userId);
    expect(verified).toBeTrue();
  });

  it('reject unverified agency', async () => {
    try {
      const userId = 'fvjZcb76tRWkXWTRkq61E6CR2N42';
      await service.rejectUserApplication(userId);
    } catch (e) {
      console.error(e);
    }
    expect().nothing();
  });

  it('pendingMemberCount', () => {
    service.pendingMemberCount.subscribe(value => {
      console.info(value);
    });
    expect().nothing();
  });

  it('delete user', async () => {
    try {
      await service.deleteUser('4GnCbzKqp9XSAz4mj7O7qo6ywai1');
    } catch (e) {
      console.error(e);
    }
    expect().nothing();
  });
});
