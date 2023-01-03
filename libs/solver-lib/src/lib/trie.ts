import { TrieNode } from './trie-node';
import { Dictionary } from './dictionary';
import { DictionaryBuilder } from './dictionary-builder';
import { assertIsDefined } from './assert-is-defined';

export class Trie implements Dictionary, DictionaryBuilder {
  private readonly root = new TrieNode();

  public addWord(word: string): void {
    let currentNode: TrieNode | undefined = this.root;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];

      if (!currentNode.hasChild(letter)) {
        currentNode.addChild(letter);
      }

      currentNode = currentNode.getChild(letter);
      assertIsDefined(currentNode);

      currentNode.endOfWord = i === word.length - 1 ? true : currentNode.endOfWord;
    }
  }

  public getWordRoot(): TrieNode {
    return this.root;
  }
}
