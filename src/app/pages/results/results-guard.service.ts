import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QuizService } from "../quiz/quiz.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class ResultsGuard {
  
    constructor(private quizSvc: QuizService, private router: Router) { }
    canActivate():
      | Observable<boolean >
      | Promise<boolean >
      | boolean
       {
      if (!this.quizSvc.allAnswered) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
  }