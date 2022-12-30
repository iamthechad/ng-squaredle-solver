import { TrieNode } from './trie-node';

export interface Dictionary {
  getWordRoot(): TrieNode;
}
