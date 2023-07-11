import { Component, Input } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { QuizService } from '../../pages/quiz/quiz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  @Input() list: Question[] = [];
  @Input() showResult: boolean = false;

  constructor(private quizSvc: QuizService) {
  }

  setSelectedAnswer(answer: string, question: Question) {
    this.quizSvc.quizQuestions.next(this.list.map((q) => {
      if (question.question === q.question) {
        return { ...q, selected_answer: answer }
      }
      return q
    }))
  }
}
