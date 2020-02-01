import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  nickname = new BehaviorSubject(null);

  constructor(private router: Router) {}

  logout(): void {
    this.nickname.next(null);
    this.router.navigate(['login']);
  }
}
