import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string;
  password: string;
  constructor(
    public af: AngularFire
  ) { };

  register() {
    this.af.auth.createUser({
      email: this.email,
      password: this.password
    }).then(res => {
      console.log(res);

    }, err => {
      console.log(err);
    }).catch(function (error) {
      console.log(error);
    });;
  }
}
