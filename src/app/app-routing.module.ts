import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultsComponent } from './pages/results/results.component';
import { ResultsGuard } from './pages/results/results-guard.service';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'results', component: ResultsComponent, canActivate: [ResultsGuard] },
  { path: '**', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
