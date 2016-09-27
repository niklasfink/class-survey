import {Component} from 'angular2/core';
import {LoginComponent} from "./login.component";

@Component({
  selector: 'my-app',
  template: `
  <h1>Welcome to my App</h1>
  <login></login>
  `,
  directives: [LoginComponent]
})

export class AppComponent {

}
