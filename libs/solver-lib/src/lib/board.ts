import { TrieNode } from './trie-node';
import { Dictionary } from './dictionary';
import { BoardAnswers, WordAnswers } from './board-answers';
import { validateBoard } from './validate-board';
import { assertIsDefined } from './assert-is-defined';

export class Board {
  private static readonly SURROUNDING_CELL_DIRS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  private readonly boardLetters: string[][];
  private readonly rowCount: number;

  constructor(boardStr: string) {
    if (validateBoard(boardStr)) {
      this.boardLetters = [];
      this.rowCount = 0;
    } else {
      const boardRows = boardStr.split('-');
      this.boardLetters = boardRows.map(row => row.split(''));

      this.rowCount = boardRows.length;
    }
  }

  public buildAnswers(dictionary: Dictionary): BoardAnswers {
    const answers = new Set<string>();
    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.rowCount; j++) {
        const cellWords = this.findFromCell([i, j], '', new Set<number>(), dictionary.getWordRoot());
        cellWords.forEach(answers.add, answers);
      }
    }

    return this.buildWordResults(answers);
  }

  private findFromCell(cellAddress: [number, number], wordSoFar: string, pathSoFar: Set<number>, trie: TrieNode): Set<string> {
    const cellWords = new Set<string>();
    const boardLetter = this.boardLetters[cellAddress[0]][cellAddress[1]];

    const nextTrie = trie.getChild(boardLetter);
    if (!nextTrie) {
      return cellWords;
    }

    const updatedWord = `${wordSoFar}${boardLetter}`;
    if (nextTrie.endOfWord) {
      cellWords.add(updatedWord);
    }

    const encodedCellLocation = this.encodeCellLocation(cellAddress);
    pathSoFar.add(encodedCellLocation);

    for (const cell of this.getNearbyCells(cellAddress)) {
      if (!pathSoFar.has(this.encodeCellLocation(cell))) {
        const childCellWords = this.findFromCell(cell, updatedWord, pathSoFar, nextTrie);
        childCellWords.forEach(cellWords.add, cellWords);
      }
    }
    pathSoFar.delete(encodedCellLocation);

    return cellWords;
  }

  private encodeCellLocation(address: [number, number]): number {
    return this.rowCount * address[0] + address[1] + 1;
  }

  private getNearbyCells(address: [number, number]): Array<[number, number]> {
    const validNearbyCells: Array<[number, number]> = [];

    for (const dir of Board.SURROUNDING_CELL_DIRS) {
      const x = address[0] + dir[0];
      const y = address[1] + dir[1];

      if (x >= 0 && x < this.rowCount && y >= 0 && y < this.rowCount) {
        validNearbyCells.push([x, y]);
      }
    }

    return validNearbyCells;
  }

  private buildWordResults(answers: Set<string>): BoardAnswers {
    const answerMap = new Map<number, WordAnswers>();

    answers.forEach(answer => {
      if (!answerMap.has(answer.length)) {
        answerMap.set(answer.length, {
          wordLength: answer.length,
          words: [],
        });
      }

      const wordAnswerEntry = answerMap.get(answer.length);
      assertIsDefined(wordAnswerEntry);

      wordAnswerEntry.words.push(answer);
    });

    const wordAnswers = [...answerMap.values()];
    wordAnswers.sort((a, b) => a.wordLength - b.wordLength);

    wordAnswers.forEach(answerSet => answerSet.words.sort());

    return {
      answerCount: answers.size,
      wordSizeResults: wordAnswers,
    };
  }
}
