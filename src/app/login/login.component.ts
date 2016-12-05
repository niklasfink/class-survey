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
    alert: any = {};

    constructor(
        public af: AngularFire,
        public router: Router
    ) { };

    login() {
        let me = this;
        this.af.auth.login({
            email: this.email,
            password: this.password
        }).then(res => {
            this.router.navigateByUrl("/");
        }).catch(function(error) {
            //error.code: auth/user-not-found auth/wrong-password
            me.alert.message = error.message;
            me.alert.type = "warning";
            console.log(error);
        });
    }
}
