import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ResultsComponent } from './pages/results/results.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { UnescapeTextPipe } from './unescape-text.pipe';
import { ResultsGuard } from './pages/results/results-guard.service';
import { ScoreComponent } from './components/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ResultsComponent,
    SpinnerComponent,
    QuestionListComponent,
    UnescapeTextPipe,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ResultsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
