import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nickname: string;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    if (!!this.nickname) {
      this.loginService.nickname.next(this.nickname);
      this.router.navigate(['game']);
    } else {
      alert('You should enter your "nickname" to access');
    }
  }

}
