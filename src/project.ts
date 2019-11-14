import { Card, cards, Deck, decks } from "./decks";

export class Project extends Card {
  
  private _deckIds: string[] = [];

  constructor() {
    super("Project")
  }

  public get deckIds(): string[] { return this._deckIds; }
  public set deckIds(newDeckIds: string[]) { this._deckIds = newDeckIds; }

  public get decks(): any {
    let decksObject: any = {};
    this.deckIds.forEach( (deckId: string) => {
      decksObject[deckId] = decks[deckId]
    });
    return decksObject;
  }
  public set decks(decksObject: any) {
    this.deckIds = decksObject.map( (deckId: string, deck: Deck): string => { return deckId; });
  }

  public newDeck(deckType: string): string {
    let newDeck: Deck = new Deck(deckType);
    this._deckIds.push(newDeck.id);
    return newDeck.id;
  }
}
