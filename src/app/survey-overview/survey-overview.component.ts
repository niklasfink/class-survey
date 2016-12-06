import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";
import { GlobalService } from '../globals';
import { Subscription } from 'rxjs/Subscription';


class Survey {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-survey-overview',
  templateUrl: './survey-overview.component.html',
  styleUrls: ['./survey-overview.component.css']
})
export class SurveyOverviewComponent implements OnInit {

  surveys: any;
  sub: Subscription;
  sub2: Subscription;

  constructor(public globals: GlobalService) { }

  ngOnInit() {
    this.globals.user.subscribe(user => {
      this.sub = this.globals.af.database.list('/users/' + user.uid + "/surveys").subscribe(s => {
        this.surveys = new Array;
        s.map(val => {
          this.sub2 = this.globals.af.database.object('/surveys/' + val.$key).subscribe(obj => {
            this.surveys.push(obj);
          });
        });
      });
    });
  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
    if (this.sub2)
      this.sub2.unsubscribe();
  }
}
