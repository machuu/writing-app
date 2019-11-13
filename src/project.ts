import { Card, cards, Deck, decks } from "./decks";

export class Project extends Card {
  
  private _deckIds: string[] = [];

  constructor() {
    super("Project")
  }

  public get deckIds(): string[] { return this._deckIds; }
  public set deckIds(newDeckIds: string[]) { this._deckIds = newDeckIds; }

  public get decks(): Deck[] {
    return this.deckIds.map( (deckId: string): Deck => {
      return decks[deckId];
    });
  }
  public set decks(deckList: Deck[]) {
    this.deckIds = deckList.map( (deck: Deck): string => { return deck.id; });
  }

  public newDeck(deckType: string): string {
    let newDeck: Deck = new Deck(deckType);
    this._deckIds.push(newDeck.id);
    return newDeck.id;
  }
}
