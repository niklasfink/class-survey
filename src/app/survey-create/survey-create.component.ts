import { Component } from '@angular/core';
import { GlobalService } from '../globals';

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

export class SurveyCreateComponent {

  questions: Array<Question> = new Array;
  name: string = "";
  description: string = "";

  constructor(public globals: GlobalService) {
  }

  addQuestion() {
    let q = new Question;
    this.questions.push(q);
  }

  addOption(question: Question) {
    question.options.push({ text: "" });
  }

  saveSurvey() {
    this.globals.user.subscribe(user => {
      this.globals.af.database.list("/users/" + user.uid + "/" + "surveys")
        .push({ name: this.name, description: this.description, questions: this.questions })
        .then(res => {
          // Survey saved! Show notification, forward to...
        })
        .catch(err => console.log(err, 'You dont have access!'));
    });
  }

}
