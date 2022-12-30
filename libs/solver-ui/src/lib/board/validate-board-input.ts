import { AbstractControl, ValidationErrors } from '@angular/forms';
import { validateBoard } from '@ng-squaredle-solver/solver-lib';

export function validateBoardInput(control: AbstractControl<string>): ValidationErrors | null {
  const boardString = control.value.trim();

  if (boardString.length > 1) {
    const validationResult = validateBoard(boardString);
    if (validationResult) {
      return { [validationResult]: true };
    }
  }

  return null;
}
