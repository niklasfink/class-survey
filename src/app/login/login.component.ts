import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(
    public af: AngularFire,
    public router: Router
  ) { };

  login() {
    this.af.auth.login({
      email: this.email,
      password: this.password
    }).then(res => {
      this.router.navigateByUrl("/");
    }).catch(function (error) {
      console.log(error);
    });
  }
}
