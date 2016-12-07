import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";
import { GlobalService } from '../globals';
import { Subscription } from 'rxjs/Subscription';


class Survey {
  id: string;
  name: string;
  description: string;
  participationCount: number;
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
  sub3: Subscription;

  constructor(public globals: GlobalService) { }

  ngOnInit() {
    this.globals.user.subscribe(user => {
      this.sub = this.globals.af.database.list('/users/' + user.uid + "/surveys").subscribe(s => {
        this.surveys = new Array;
        s.map(val => {
          this.sub2 = this.globals.af.database.object('/surveys/' + val.$key).subscribe(obj => {
            this.sub3 = this.globals.af.database.list('/participations/' + val.$key).subscribe(ps => {
              obj.participationCount = ps.length;
            });
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
    if (this.sub3)
      this.sub3.unsubscribe();
  }
}
