import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { BASE_URL, CATEGORIES_API, QUIZ_API } from './quiz.constants';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Question } from 'src/app/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizQuestions: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([])
  allAnswered: boolean = false;
  finalScore: number = 0;

  constructor(private httpSvc: HttpClient) { }


  fetchCategories(): Observable<{ trivia_categories: Category[] }> {
    return this.httpSvc
      .get<{ trivia_categories: Category[] }>(`${BASE_URL}/${CATEGORIES_API}`)
  }

  generateQuiz(category: number, difficulty: string) {
    const paramsObj: { [key: string]: string | number } = { category, difficulty, amount: '5' }
    let params = new HttpParams();
    for (const param of Object.keys(paramsObj)) {
      params = params.append(param, paramsObj[param].toString())
    }

    this.httpSvc
      .get<{ results: Question[] }>(`${BASE_URL}/${QUIZ_API}`, { params })
      .pipe(map(data => {
        const results = data.results.map((question) => {
          const { correct_answer, incorrect_answers } = question;
          return { ...question, random_answers: this.shuffleArray([correct_answer, ...incorrect_answers]) }
        })
        return { ...data, results }
      }
      ))
      .subscribe((data) => this.quizQuestions.next(data.results));
  }

  shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  calculateScore() {
    this.quizQuestions.getValue().forEach((question) => {
      const { selected_answer, correct_answer } = question;
      if (correct_answer === selected_answer) {
        this.finalScore = this.finalScore + 1;
      }
    })
  }
}
