import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthContentGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated().then(value => !value);
  }

  private async isAuthenticated(): Promise<boolean> {
    return this.auth.isSignedIn()
      .then(value => {
        if (value) {
          return this.router.navigate(['/'])
            .then(_ => value).catch(_ => value);
        }
        return value;
      });
  }
}
