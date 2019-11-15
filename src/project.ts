import BaseCard from "./baseCard";
import Deck from "./deck";

export class Project extends BaseCard {
  
  private _deckIds: string[] = [];

  private static _projects: any = {};

  constructor() {
    super("Project")
    this.updateGlobal();
  }

  private updateGlobal(): void {
    Project._projects[this.id] = this;
  }

  public get deckIds(): string[] { return this._deckIds; }
  public set deckIds(newDeckIds: string[]) {
    this._deckIds = newDeckIds;
    this.updateGlobal();
  }

  public get decks(): any {
    let decksObject: any = {};
    this.deckIds.forEach( (deckId: string) => {
      decksObject[deckId] = Deck.decks[deckId]
    });
    return decksObject;
  }

  public set decks(decksObject: any) {
    this.deckIds = decksObject.map( (deckId: string, deck: Deck): string => { return deckId; });
    this.updateGlobal();
  }

  public newDeck(deckType: string): string {
    let newDeck: Deck = new Deck(deckType);
    this._deckIds.push(newDeck.id);
    this.updateGlobal();
    return newDeck.id;
  }

  public addDeck(deck: Deck) {
    this.addDeckId( deck.id );
  }
  public addDeckId( deckId: string ) {
    this._deckIds.push( deckId );
    this.updateGlobal();
  }

  public static get projects(): any {
    return Project._projects;
  }
  public static set projects(projectsObject: any) {
    Project._projects = projectsObject;
  }
}

export default Project;
