import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private router: Router;
  private authService: AuthService;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loginRequired = route.data['loginRequired'] ? true : false;
    const canAccessRoute = loginRequired ? this.authService.isAuthenticated() : !this.authService.isAuthenticated();

    if (!canAccessRoute) {
      if (loginRequired) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['dashboard']);
      }
      return false;
    }

    return true;
  }

}
