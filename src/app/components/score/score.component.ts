import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  @Input() score: number = 0;
  @Input() max: number = 0;

  getColor() {
    if (this.score <= 1) {
      return 'red';
    } else if (this.score <= 2 && this.score <= 3) {
      return 'yellow';
    }
    return 'green';
  }
}
