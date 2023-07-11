import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs';

import { QUIZ_DIFFICULTIES } from './quiz.constants';
import { QuizService } from './quiz.service';
import { Category } from 'src/app/models/category.model';
import { Question } from 'src/app/models/question.model';
import { Difficulty } from 'src/app/models/difficulty.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  isLoading: boolean = false;
  quizQuestions: Question[] = [];
  showSubmitQuizBtn = false;
  subscription: Subscription = new Subscription()

  constructor(private quizService: QuizService, private router: Router) {

  }

  ngOnInit() {
    this.quizService.quizQuestions.next([]);
    this.quizService.allAnswered = false;
    this.quizService.finalScore = 0;

    this.fetchCategories();
    this.subscription = this.quizService.quizQuestions.subscribe((questions) => {
      this.quizQuestions = questions;
      if (questions.length) {
        this.isLoading = false;
      }
      if (questions?.length > 0 && questions.every((question) => !!question.selected_answer)) {
        this.showSubmitQuizBtn = true;
      } else {
        this.showSubmitQuizBtn = false;
      }
    });

  }

  fetchCategories() {
    this.isLoading = true;
    this.quizService
      .fetchCategories()
      .subscribe({
        next: (data) => {
          this.categories = data.trivia_categories || [];
          this.isLoading = false
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  getDifficulties(): Difficulty[] {
    return QUIZ_DIFFICULTIES;
  }

  formSubmit(form: NgForm) {
    const { difficultySelect, categorySelect } = form.value;
    this.isLoading = true;
    this.quizService.generateQuiz(categorySelect, difficultySelect);
  }

  submitQuiz() {
    this.quizService.allAnswered = true;
    this.quizService.calculateScore();
    this.router.navigateByUrl('/results');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
