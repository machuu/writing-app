import BaseCard from "./baseCard";
import Deck from "./deck";

export class Project extends BaseCard {
  
  private _deckIds: string[] = [];

  private static _projects: any = {};

  constructor() {
    super("Project")
    this.updateGlobal();
  }

  protected updateGlobal(): void {
    Project._projects[this.id] = this;
  }

  protected convertDeckIdsToDecks(deckIdList: string[]): any {
    let decksObject: any = {};
    deckIdList.forEach( (deckId: string) => {
      decksObject[deckId] = Deck.decks[deckId]
    });
    return decksObject;
  }
  protected convertDecksToDeckIds(decksObject: any): string[] {
    return decksObject.map( (deckId: string, deck: Deck): string => { return deckId; });
  }
  protected getFilteredDeckIds(filterString: string = ".*"): string[] {
    let filterRegex = RegExp(filterString);
    return this._deckIds.filter( (element) => {
      return filterRegex.test(element);
    });
  }

  // Deck ID setter/getters
  public set deckIds(newDeckIds: string[]) {
    this._deckIds = newDeckIds;
    this.updateGlobal();
  }
  public get deckIds(): string[] {
    return this._deckIds;
  }
  public get sceneDeckIds(): string[] {
    return this.getFilteredDeckIds("^Scene");
  }
  public get referenceDeckIds(): string[] {
    return this.getFilteredDeckIds("^Reference");
  }

  // Deck setter/getters
  public set decks(decksObject: any) {
    this.deckIds = this.convertDecksToDeckIds(decksObject);
    this.updateGlobal();
  }
  public get decks(): any {
    return this.convertDeckIdsToDecks(this.deckIds);
  }
  public get sceneDecks(): any {
    return this.convertDeckIdsToDecks(this.sceneDeckIds);
  }
  public get referenceDecks(): any {
    return this.convertDeckIdsToDecks(this.referenceDeckIds);
  }

  // New Decks
  public newDeck(deckType: string): string {
    let newDeck: Deck = new Deck(deckType);
    this._deckIds.push(newDeck.id);
    this.updateGlobal();
    return newDeck.id;
  }
  public newReferenceDeck(): string {
    return this.newDeck("Reference");
  }
  public newSceneDeck(): string {
    return this.newDeck("Scene");
  }

  public addDeck(deck: Deck) {
    this.addDeckId( deck.id );
  }
  public addDeckId( deckId: string ) {
    this._deckIds.push( deckId );
    this.updateGlobal();
  }

  // Global Projects
  public static get projects(): any {
    return Project._projects;
  }
  public static set projects(projectsObject: any) {
    Project._projects = projectsObject;
  }
}

export default Project;
