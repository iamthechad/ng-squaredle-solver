import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';
import { Board, BoardAnswers } from '@ng-squaredle-solver/solver-lib';

interface ExpectedWordResults {
  totaWords: number;
  wordSizeResults: Array<[number, number]>;
}

function verifyBoardAnswers(answers: BoardAnswers, expected: ExpectedWordResults): void {
  expect(answers).toBeTruthy();
  expect(answers.answerCount).toEqual(expected.totaWords);

  const wordAnswers = answers.wordSizeResults;
  const expectedWordSizeResults = expected.wordSizeResults;

  expect(wordAnswers.length).toEqual(expectedWordSizeResults.length);

  wordAnswers.forEach((result, index) => {
    const expectedResult = expectedWordSizeResults[index];

    expect(result.wordLength).toEqual(expectedResult[0]);
    expect(result.words.length).toEqual(expectedResult[1]);
  });
}

describe('Board', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordService);
  });

  it('should solve a 4x4 board', () => {
    const board = new Board('ccea-otor-bbsn-leve');
    const answers = board.buildAnswers(service);

    verifyBoardAnswers(answers, {
      totaWords: 150,
      wordSizeResults: [
        [4, 72],
        [5, 47],
        [6, 20],
        [7, 8],
        [8, 2],
        [11, 1],
      ],
    });
  });
});
