import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  redirect: boolean;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.nickname.subscribe((nickname: string) => {
      this.redirect = !!nickname;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.redirect === false) {
      this.router.navigate(['login']).then(null);
    }

    return this.redirect;
  }
}
