import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { Router } from '@angular/router';
import { QuizService } from '../quiz/quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  quizQuestions: Question[] = [];
  score: number = 0;

  constructor(private quizSvc: QuizService, private router: Router) {
  }

  ngOnInit(): void {
    this.quizQuestions = this.quizSvc.quizQuestions.getValue()
    this.score = this.quizSvc.finalScore;
  }

  handleNewQuiz() {
    this.router.navigate(['/']);
  }
}
