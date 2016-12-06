import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../globals';

@Component({
  selector: 'app-survey-participate',
  templateUrl: './survey-participate.component.html',
  styleUrls: ['./survey-participate.component.css']
})
export class SurveyParticipateComponent implements OnInit {

  private sub: any;
  private id: any;
  private survey: any;
  private participation: any = [];

  constructor(
    private route: ActivatedRoute,
    private globals: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id.length != 20)
        this.router.navigateByUrl("/");
      this.sub = this.globals.af.database.object("/surveys/" + this.id).subscribe(survey => {
        if (survey.$exists()) {
          this.survey = survey;
          console.log(survey);
        } else {
          this.router.navigateByUrl("/");
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
  }
}
