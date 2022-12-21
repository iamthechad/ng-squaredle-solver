import { Component } from '@angular/core';
import {BoardComponent} from "@ng-squaredle-solver/solver-ui";

@Component({
  selector: 'ng-squaredle-solver-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [BoardComponent]
})
export class AppComponent {
}
