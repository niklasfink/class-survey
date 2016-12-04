import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFire, AuthProviders } from "angularfire2";

export class User {
    uid: string;
    firstName: string;
    lastName: string;
}

@Injectable()
export class GlobalService {

    // Observable user source
    private subject = new BehaviorSubject<User>(null);
    // Observable user stream
    user = this.subject.asObservable();
    // for fast login checks
    loggedIn: boolean = false;

    constructor(public af: AngularFire) {
        this.af.auth.subscribe(authstate => {
            if (authstate) {
                let user = new User;
                user.uid = authstate.uid;
                // user logged in
                let fName = this.af.database.object("/users/" + user.uid + "/firstName")
                    .subscribe(data => {
                        user.firstName = data.$value;
                        fName.unsubscribe();
                        if (user.firstName && user.lastName) {
                            this.subject.next(user);
                        }
                    });
                let lName = this.af.database.object("/users/" + user.uid + "/lastName")
                    .subscribe(data => {
                        user.lastName = data.$value;
                        lName.unsubscribe();
                        if (user.firstName && user.lastName) {
                            this.subject.next(user);
                        }
                    });
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
                // user not logged in
            }
        });
    }
}