import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';
import { GlobalService } from '../globals';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  firstName: string;

  constructor(
    private router: Router,
    private globals: GlobalService
  ) { }

  ngOnInit() {
    this.globals.user.subscribe(user => {
      this.firstName = user.firstName;
    })
  }

  logout() {
    this.globals.af.auth.logout();
    this.router.navigateByUrl("/");
  }

}
