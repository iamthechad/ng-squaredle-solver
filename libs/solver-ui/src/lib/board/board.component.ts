import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Board, BoardAnswers, WordService } from '@ng-squaredle-solver/solver-lib';
import { validateBoardInput } from './validate-board-input';
import { ArrayJoinPipe } from './array-join.pipe';

@Component({
  selector: 'mt-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, ArrayJoinPipe],
})
export class BoardComponent {
  protected readonly form: FormGroup<{
    board: FormControl<string>;
  }>;

  protected boardAnswers: BoardAnswers | undefined;

  constructor(nonNullableFormBuilder: NonNullableFormBuilder, private readonly wordService: WordService) {
    this.form = nonNullableFormBuilder.group({
      board: nonNullableFormBuilder.control('', validateBoardInput),
    });
  }

  protected get errorMessage(): string {
    return 'foo';
  }

  protected onSubmit(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    const board = new Board(this.form.controls.board.value.trim().toLowerCase());

    this.boardAnswers = board.buildAnswers(this.wordService);
  }
}
