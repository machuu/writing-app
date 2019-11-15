import { Card, Deck } from "./decks";

export class Project extends Card {
  
  private _deckIds: string[] = [];

  private static _projects: any = {};

  constructor() {
    super("Project")
    Project._projects[this.id] = this;
  }

  public get deckIds(): string[] { return this._deckIds; }
  public set deckIds(newDeckIds: string[]) { this._deckIds = newDeckIds; }

  public get decks(): any {
    let decksObject: any = {};
    this.deckIds.forEach( (deckId: string) => {
      decksObject[deckId] = Deck.decks[deckId]
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

  public addDeck(deck: Deck) {
    this.addDeckId( deck.id );
  }
  public addDeckId( deckId: string ) {
    this._deckIds.push( deckId );
  }

  public static get projects(): any {
    return Project._projects;
  }
  public static set projects(projectsObject: any) {
    Project._projects = projectsObject;
  }
}
