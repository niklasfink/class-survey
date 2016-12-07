import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../globals';
import { ActivatedRoute, Router } from '@angular/router';

class Question {
  id: string;
  type: number;
  question: string;
  options: Array<any> = new Array;

  removeOption(index: number) {
    this.options.splice(index, 1);
  }
}

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})

export class SurveyCreateComponent implements OnInit {

  questions: Array<Question> = new Array;
  name: string = "";
  description: string = "";
  edit: boolean = true;
  sub: any;
  sub2: any;
  id: any;
  headerVerb: string = "Create";

  constructor(
    private route: ActivatedRoute,
    private globals: GlobalService,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id.length != 20) {
        this.router.navigateByUrl("/survey-overview");
        return;
      }
      this.edit = false;
      this.headerVerb = "Modify";
      this.sub2 = this.globals.af.database.object("/surveys/" + this.id).subscribe(survey => {
        if (survey.$exists()) {
          this.questions = survey.questions;
          this.name = survey.name;
          this.description = survey.description;
        } else {
          this.router.navigateByUrl("/survey-overview");
        }
      });
    });
  }

  addQuestion(type: number) {
    let q = new Question;
    this.questions.push(q);
  }

  addOption(question: Question) {
    question.options.push({ text: "" });
  }

  saveSurvey() {
    this.globals.user.subscribe(user => {
      if (this.id) {
        this.globals.af.database.list("/surveys/")
          .update(this.id, { ownerid: user.uid, name: this.name, description: this.description, questions: this.questions })
          .then(res => {
            // Survey saved! Show notification, forward to...
            console.log("saved!");
          })
          .catch(err => console.log(err, 'You dont have access!'));
      } else {
        this.globals.af.database.list("/surveys/")
          .push({ ownerid: user.uid, name: this.name, description: this.description, questions: this.questions })
          .then(res => {
            this.globals.af.database.object("/users/" + user.uid + "/surveys/")
              .update({ [res.getKey()]: true })
              .then(res => {
                // Survey saved! Show notification, forward to...
                console.log("saved!");
              })
              .catch(err => console.log(err, 'You dont have access!'));
          })
          .catch(err => console.log(err, 'You dont have access!'));
      }
    });
  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
    if (this.sub2)
      this.sub2.unsubscribe();
  }

}
