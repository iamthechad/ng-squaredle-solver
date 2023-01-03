export class TrieNode {
  private readonly children = new Map<string, TrieNode>();
  private _endOfWord = false;

  public get endOfWord() {
    return this._endOfWord;
  }

  public set endOfWord(endOfWord: boolean) {
    this._endOfWord = endOfWord;
  }

  public hasChild(letter: string): boolean {
    return this.children.has(letter);
  }

  public addChild(letter: string): void {
    this.children.set(letter, new TrieNode());
  }

  public getChild(letter: string): TrieNode | undefined {
    return this.children.get(letter);
  }
}
