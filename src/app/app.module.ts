import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {
  AngularFireModule,
  AuthMethods,
  AuthProviders,
  AngularFire
} from "angularfire2";
import { RegisterComponent } from './register/register.component';

const firebaseConfig = ({
  apiKey: "AIzaSyB_PXaiTdRaxSILx5dWjT-_vasfT9LBk7Q",
  authDomain: "class-survey.firebaseapp.com",
  databaseURL: "https://class-survey.firebaseio.com",
  storageBucket: "class-survey.appspot.com",
  messagingSenderId: "768843683653"
});

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    routing,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  user: any;
  constructor(
    public af: AngularFire
  ) {
    this.af.auth.subscribe(user => {
      if (user) {
        // user logged in
        this.user = user;
        console.log(user);
      }
      else {
        // user not logged in
        this.user = {};
      }
    });
  }

}
