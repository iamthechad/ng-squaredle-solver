import { TrieNode } from './trie-node';
import { Dictionary } from './dictionary';
import { BoardAnswers, WordAnswers } from './board-answers';

export class Board {
  private readonly boardLetters: string[][];
  private readonly rowCount: number;
  private readonly answers = new Set<string>();

  constructor(boardStr: string) {
    this.validate(boardStr);

    const boardRows = boardStr.split('-');
    this.boardLetters = boardRows.map(row => row.split(''));

    this.rowCount = boardRows.length;
  }

  public buildAnswers(dictionary: Dictionary): BoardAnswers {
    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.rowCount; j++) {
        this.dfs([i, j], '', new Set<number>(), dictionary.getWordRoot());
      }
    }

    //console.log(this.answers);
    return {
      answerCount: this.answers.size,
      wordSizeResults: this.buildWordResults(),
    };
  }

  public validate(boardStr: string): void {
    // Split the string into individual rows
    const boardRows = boardStr.split('-');

    // Check whether each row has the same length
    for (const item of boardRows) {
      if (item.length !== boardRows.length) {
        throw new Error('Board does not represent a square. Please re-check your input');
      }
    }

    // Check whether the size is valid
    if (boardRows.length < 3) {
      throw new Error('Minimum board size is 3');
    }
  }

  private dfs(address: [number, number], wordSoFar: string, pathSoFar: Set<number>, trie: TrieNode) {
    const boardLetter = this.boardLetters[address[0]][address[1]];
    //console.log('dfs', { address, wordSoFar, pathSoFar: new Set(pathSoFar), trie, boardLetter });

    // Check whether this letter makes a valid prefix
    if (!trie.hasChild(boardLetter)) {
      return;
    }
    const newTrie = trie.getChild(boardLetter);

    // Check whether this letter is EOW
    const updatedWord = `${wordSoFar}${boardLetter}`;
    if (newTrie.endOfWord) {
      this.answers.add(updatedWord);
    }

    pathSoFar.add(this.encode(address));

    for (const nb of this.getNBs(address)) {
      // For each neighbouring letter...

      if (!pathSoFar.has(this.encode(nb))) {
        // If the nb is not in the path
        //console.log(pathSoFar, nb)

        this.dfs(nb, updatedWord, pathSoFar, newTrie);
      }
    }
    pathSoFar.delete(this.encode(address));
  }

  private encode(address: [number, number]): number {
    return this.rowCount * address[0] + address[1] + 1;
  }

  private getNBs(address: [number, number]): Array<[number, number]> {
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const arr: Array<[number, number]> = [];

    for (const dir of dirs) {
      const x = address[0] + dir[0];
      const y = address[1] + dir[1];

      if (x >= 0 && x < this.rowCount && y >= 0 && y < this.rowCount) {
        arr.push([x, y]);
      }
    }

    return arr;
  }

  private buildWordResults(): WordAnswers[] {
    const answerMap = new Map<number, WordAnswers>();

    this.answers.forEach(answer => {
      if (!answerMap.has(answer.length)) {
        answerMap.set(answer.length, {
          wordLength: answer.length,
          words: [],
        });
      }

      const wordAnswerEntry = answerMap.get(answer.length);
      if (wordAnswerEntry === undefined) {
        throw new Error('Need a real assertion here');
      }

      wordAnswerEntry.words.push(answer);
    });

    const wordAnswers = [...answerMap.values()];
    wordAnswers.sort((a, b) => a.wordLength - b.wordLength);

    wordAnswers.forEach(answerSet => answerSet.words.sort());

    return wordAnswers;
  }
}
