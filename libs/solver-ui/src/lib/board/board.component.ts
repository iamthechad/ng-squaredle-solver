import { Component } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {Board, BoardAnswers, WordService} from "@ng-squaredle-solver/solver-lib";

@Component({
  selector: 'ng-squaredle-solver-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule]
})
export class BoardComponent {
  protected readonly form: FormGroup<{
    board: FormControl<string>
  }>;

  protected boardAnswers: BoardAnswers | undefined;

  constructor(nonNullableFormBuilder: NonNullableFormBuilder,
              private readonly wordService: WordService) {
    this.form = nonNullableFormBuilder.group({
      board: nonNullableFormBuilder.control('')
    });
  }

  protected getErrorMessage(): string {
    return 'foo';
  }

  protected onSubmit(): void {
    const board = new Board(this.form.controls.board.value);

    this.boardAnswers = board.buildAnswers(this.wordService);
  }
}
