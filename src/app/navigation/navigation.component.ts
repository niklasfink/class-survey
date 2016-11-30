import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';
import { GlobalService } from '../globals';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(
    public af: AngularFire,
    private router: Router,
    public globals: GlobalService
  ) { }

  logout() {
    this.af.auth.logout();
    this.router.navigateByUrl("/");
  }

}
