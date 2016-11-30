import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
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
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})

export class CreateSurveyComponent {

  questions: Array<Question> = new Array;
  name: string = "";
  description: string = "";

  constructor(public af: AngularFire,
    public globals: GlobalService) {
  }

  addQuestion() {
    let q = new Question;
    this.questions.push(q);
  }

  addOption(question: Question) {
    question.options.push({ text: "" });
  }

  saveSurvey() {
    this.af.database.list("/users/" + this.globals.user.uid + "/" + "surveys")
      .push({ name: this.name, description: this.description, questions: this.questions })
      .then(res => {
        // Survey saved! Show notification, forward to...
      })
      .catch(err => console.log(err, 'You dont have access!'));
  }

}
