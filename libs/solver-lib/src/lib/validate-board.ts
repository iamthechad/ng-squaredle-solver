export type BoardValidationError = 'invalid' | 'size';

export function validateBoard(boardString: string): BoardValidationError | undefined {
  const boardRows = boardString.split('-');

  for (const item of boardRows) {
    if (item.length !== boardRows.length) {
      return 'invalid';
    }
  }

  if (boardRows.length < 3) {
    return 'size';
  }

  return undefined;
}
