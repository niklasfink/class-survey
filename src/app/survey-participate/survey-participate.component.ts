import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../globals';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs';

class Participation {
  constructor(type: any) {
    this.type = type;
  }
  type: number = -1;
  answer: any = null;
}

@Component({
  selector: 'app-survey-participate',
  templateUrl: './survey-participate.component.html',
  styleUrls: ['./survey-participate.component.css']
})
export class SurveyParticipateComponent implements OnInit {

  private sub: any;
  private sub2: any;
  private id: any;
  private survey: any;
  private participations: any = new Array<Participation>();
  private storage: any;
  private uploadpercentage: number = 0;
  private imagePath: string;
  private participationid: any;
  private savePath: string;
  private allUploaded: boolean = false;
  @ViewChild('uploadform') input;

  constructor(
    private route: ActivatedRoute,
    private globals: GlobalService,
    private router: Router,
    @Inject(FirebaseApp) firebase: any
  ) {
    this.participationid = firebase.database().ref().push().key;
    this.storage = firebase.storage().ref();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id.length != 20) {
        this.router.navigateByUrl("/");
        return;
      }
      this.sub2 = this.globals.af.database.object("/surveys/" + this.id).subscribe(survey => {
        if (survey.$exists()) {
          for (let i = 0; i < survey.questions.length; i++) {
            this.participations[i] = new Participation(survey.questions[i].type);
          }
          this.survey = survey;
          this.imagePath = "/surveyimages/" + this.id;
        } else {
          this.router.navigateByUrl("/");
        }
      });
    });
  }

  save() {
    this.globals.af.database.object("/participations/" + this.id + "/" + this.participationid).set(this.participations).then(() => {
      console.log("save successfull");
      //forward to 'complete page'
    }).catch(err => console.log(err));
  }

  upload(event, questionindex) {
    let files = event.srcElement.files[0];
    if (!files) return;
    this.savePath = this.imagePath + "/" + this.participationid + "_" + files.name;
    let task = this.storage.child(this.savePath).put(files);
    task.on('state_changed', snapshot => {
      this.uploadpercentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    },
      error => { console.log(error); },
      () => {
        // Upload successfull
        this.participations[questionindex].answer = task.snapshot.downloadURL;
        this.participations.forEach(p => {
          if (p.type >= 3) {
            if (p.answer.length > 1) {
              this.allUploaded = true;
            } else {
              this.allUploaded = false;
              return;
            }
          }
        });
      });
  }

  removeImage(i) {
    this.participations[i].answer = "";
    this.input.nativeElement.value = "";
    this.uploadpercentage = 0;
    this.allUploaded = false;
    this.storage.child(this.savePath).delete().then(() => {
      console.log("deleted!");
    }).catch(err => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
    if (this.sub2)
      this.sub2.unsubscribe();
  }
}
