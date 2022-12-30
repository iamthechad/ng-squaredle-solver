import { TrieNode } from './trie-node';
import { Dictionary } from './dictionary';
import { DictionaryBuilder } from './dictionary-builder';

export class Trie implements Dictionary, DictionaryBuilder {
  private readonly root = new TrieNode();

  public addWord(word: string): void {
    let currentNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];

      if (!currentNode.hasChild(letter)) {
        currentNode.addChild(letter);
      }

      currentNode = currentNode.getChild(letter);

      currentNode.endOfWord = i === word.length - 1 ? true : currentNode.endOfWord;
    }
  }

  public getWordRoot(): TrieNode {
    return this.root;
  }

  public checkWord(word: string): boolean {
    let currentNode = this.root;
    for (const letter of word) {
      if (!currentNode.hasChild(letter)) {
        return false;
      }
      currentNode = currentNode.getChild(letter);
    }

    return currentNode.endOfWord;
  }
}
