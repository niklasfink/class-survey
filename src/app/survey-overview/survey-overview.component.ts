import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";
import { GlobalService } from '../globals';

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

  surveys: any = new Array;

  constructor(public globals: GlobalService) { }

  ngOnInit() {
    this.globals.user.subscribe(user => {
      console.log(user);
      this.globals.af.database.list('/users/' + user.uid + "/surveys").subscribe(s => {
        s.map(item => {
          this.surveys.push(item);
        });
      });
    });
  }
}
