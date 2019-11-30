import BaseCard from "./baseCard";
import Deck from "./deck";
import Card from "./card";
import NavMenu from "./navigation";
import TextEditor from "./editor";

export interface IProjectJSON {
  _attributes: any;
  _description: string;
  _deckIds: string[];
  _id: string;
  _name: string;
  _text: any;
}

export class Project extends BaseCard {
  
  public sceneNavigator: NavMenu;
  public referenceNavigator: NavMenu;
  public mainEditor: TextEditor;

  private _deckIds: string[] = [];

  private static _projects: any = {};

  constructor() {
    super("Project")
    this.updateGlobal();
  }

  protected updateGlobal(): void {
    Project._projects[this.id] = this;
    this.populateNavigators();
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

  public setupProjectWindow() {
    this.sceneNavigator = new NavMenu("scene-navigator");
    this.sceneNavigator.closed_width = "20px";
    this.sceneNavigator.opened_width = "250px";

    this.referenceNavigator = new NavMenu("card-navigator");
    this.referenceNavigator.closed_width = "20px";
    this.referenceNavigator.opened_width = "250px";

    this.mainEditor = new TextEditor("editorjs");
    this.mainEditor.addSaveButton("saveButton");
    this.mainEditor.addLoadButton("loadButton");
  }

  public populateNavigators() {
    this.populateNavigator("Scene");
    this.populateNavigator("Reference");
  }

  private populateNavigator(navigatorType: string) {
    let deckDiv: HTMLElement;
    let cardHolderDiv: HTMLElement;
    let cardDiv: HTMLElement;

    console.log(`Populating Navigator Type: ${navigatorType}`);
    let navigator: NavMenu;
    let deckIds: string[];

    switch( navigatorType.toUpperCase() ) {
      case "SCENE":
        navigator = this.sceneNavigator;
        deckIds   = this.sceneDeckIds;
        break;
      case "REFERENCE":
        navigator = this.referenceNavigator;
        deckIds   = this.referenceDeckIds;
        break;
      default:
        deckIds = [];
        console.log(`Unkown Navigator Type: ${navigatorType}`);
    }

    console.log("Populating Scene Navigator");
    console.log(this.sceneDecks);
    console.log(this.sceneDeckIds);

    for ( let deckId of deckIds ) {
      let deck: Deck = Deck.decks[deckId];

      // Add div for Deck
      console.log(`Adding Deck: ${deck}`);
      deckDiv = document.createElement("div");
      deckDiv.classList.add("navigator-item");
      deckDiv.id = `Nav-${deck.id}`;
      deckDiv.innerHTML = deck.name;
      navigator.element.appendChild(deckDiv);

      cardHolderDiv = document.createElement("div");
      cardHolderDiv.style.paddingLeft = "10px";
      navigator.element.appendChild(cardHolderDiv);

      for ( let cardId of deck.cardIds ) {
        let card: Card = Card.cards[cardId];

        // Add div for Card
        console.log(`Adding Card: ${card.id}`);
        cardDiv = document.createElement("div");
        cardDiv.classList.add("navigator-item");
        cardDiv.id = `Nav-${card.id}`;
        cardDiv.innerHTML = card.name;

        cardHolderDiv.appendChild(cardDiv);
      }

      // Add button for New Card
      console.log(`Adding New Card Button`);
      cardDiv = document.createElement("div");
      cardDiv.classList.add("navigator-item");
      cardDiv.id = `Nav-NewCardButton`;
      cardDiv.innerHTML = "+ New Card";
      cardHolderDiv.appendChild(cardDiv);
    }

    // Add button for New Deck
    console.log(`Adding New Deck Button`);
    deckDiv = document.createElement("div");
    deckDiv.classList.add("navigator-item");
    deckDiv.id = `Nav-NewDeckButton`;
    deckDiv.innerHTML = "+ New Deck";
    navigator.element.appendChild(deckDiv);
  }

  // JSON Helpers
  // per: http://choly.ca/post/typescript-json/
  public toJSON(): IProjectJSON {
    return Object.assign({}, this, {
      // explicitly assign protected fields
      _attributes:  this._attributes,
      _description: this._description,
      _deckIds:     this._deckIds,
      _id:          this._id,
      _name:        this._name,
      _text:        this._text,
    });
  }

  public static fromJSON(projectJSON: IProjectJSON): Project {
    // Assign JSON to new Project object
    let projectAssigned: Project  = Object.assign(Object.create(Project.prototype), projectJSON);
    Project.projects[projectAssigned.id] = projectAssigned;
    return projectAssigned;
  }

  public static reviver(key: string, value: any): any {
    return key === "" ? Project.fromJSON(value) : value;
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
