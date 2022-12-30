import { Injectable } from '@angular/core';
import { Trie } from './trie';
import { wordList } from './word-list';
import { Dictionary } from './dictionary';
import { TrieNode } from './trie-node';

@Injectable({
  providedIn: 'root',
})
export class WordService implements Dictionary {
  private readonly dictionary = new Trie();
  constructor() {
    wordList.forEach(word => this.dictionary.addWord(word));
  }

  public getWordRoot(): TrieNode {
    return this.dictionary.getWordRoot();
  }
}
