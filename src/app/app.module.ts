import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule, AuthMethods, AuthProviders, AngularFire } from "angularfire2";
import { RegisterComponent } from './register/register.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { GlobalService } from './globals';

const firebaseConfig = ({
  apiKey: "AIzaSyB_PXaiTdRaxSILx5dWjT-_vasfT9LBk7Q",
  authDomain: "class-survey.firebaseapp.com",
  databaseURL: "https://class-survey.firebaseio.com",
  storageBucket: "class-survey.appspot.com",
  messagingSenderId: "768843683653"
});

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent,
    CreateSurveyComponent, NavigationComponent, HomeComponent
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
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public af: AngularFire,
    public globals: GlobalService
  ) {
    this.af.auth.subscribe(user => {
      console.log(user);
      if (user) {
        // user logged in
        this.globals.user = user;
        let fName = this.af.database.object("/users/" + user.uid + "/firstName")
          .subscribe(data => {
            this.globals.user.firstName = data.$value;
            fName.unsubscribe();
          });
        let lName = this.af.database.object("/users/" + user.uid + "/lastName")
          .subscribe(data => {
            this.globals.user.lastName = data.$value;
            lName.unsubscribe();
          });
      } else {
        this.globals.user = null;
        // user not logged in
      }
    });
  }
}
