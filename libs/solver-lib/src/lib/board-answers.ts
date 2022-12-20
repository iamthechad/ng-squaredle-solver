export interface BoardAnswers {
  answerCount: number;
  wordSizeResults: WordAnswers[];
}

export interface WordAnswers {
  wordLength: number;
  words: string[];
}
