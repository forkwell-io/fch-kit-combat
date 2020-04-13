import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../@backend/user.service';
import {Router} from '@angular/router';
import {User} from '../../@core/firestore-interfaces/user';
import {UserRequestService} from '../@backend/user-request.service';
import {MessageService} from '../@backend/message.service';
import FirebaseUser = firebase.User;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public isLoading = true;
  public isAdmin = false;
  public user: FirebaseUser;
  public isAdminVerified = false;
  public agency: User;
  public contributionCount = 0;
  public inboxCount = 0;

  constructor(private router: Router,
              private auth: AuthService,
              private userService: UserService,
              private userRequestService: UserRequestService,
              private messageService: MessageService) {
    messageService.unreadMessagesCount()
      .then(observable => {
        observable.subscribe(count => this.inboxCount = count);
      });
    userRequestService.incomingContributionsCount()
      .then(observable => {
        observable.subscribe(count => this.contributionCount = count);
      });
    auth.getCurrentUser()
      .then(user => this.user = user)
      .finally(() => this.isLoading = false);
    userService.iamAdmin()
      .then(value => this.isAdmin = value);
    userService.iamVerifiedByAdmin()
      .then(isVerified => this.isAdminVerified = isVerified);
    userService.currentUserInfo()
      .then(agency => this.agency = agency);
  }

  ngOnInit(): void {
  }

  public signOut() {
    return this.auth.signOut()
      .then(_ => {
        return this.router.navigate(['/']);
      })
      .finally(() => this.user = null);
  }
}
