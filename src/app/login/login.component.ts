import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  constructor(
    public af: AngularFire
  ) { };

  login() {
    this.af.auth.login({
      email: this.email,
      password: this.password
    }).then(res => {
      console.log(res);
    }).catch(function (error) {
      console.log(error);
    });
  }
}
