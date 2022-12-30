import { Component } from '@angular/core';
import { AboutComponent, BoardComponent } from '@ng-squaredle-solver/solver-ui';

@Component({
  selector: 'ng-squaredle-solver-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [BoardComponent, AboutComponent],
})
export class AppComponent {}
