import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    email: string = "";
    password: string = "";
    firstName: string = "";
    lastName: string = "";
    alert: any = {};

    constructor(private af: AngularFire, private router: Router) { };

    register() {
        let me = this;
        if (this.firstName.length > 2 && this.lastName.length > 2) {
            this.af.auth.createUser({
                email: this.email,
                password: this.password
            }).then(res => {
                console.log(res);
                this.af.database.object("/users/" + res.uid).set({ firstName: this.firstName, lastName: this.lastName })
                    .then(() => this.router.navigateByUrl("/"))
                    .catch(err => console.log(err));
            }).catch(function (error) {
                //error.code: auth/weak-password auth/email-already-in-use
                me.alert.message = error.message;
                me.alert.type = "warning";
                console.log(error);
            });
        }
    }
}
