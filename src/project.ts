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
    this.populateSceneNavigator();
  }

  private populateSceneNavigator() {
    let sceneDeckDiv: HTMLElement;
    let sceneCardHolderDiv: HTMLElement;
    let sceneCardDiv: HTMLElement;

    console.log("Populating Scene Navigator");
    console.log(this.sceneDecks);
    console.log(this.sceneDeckIds);

    for ( let sceneDeckId of this.sceneDeckIds ) {
      let sceneDeck: Deck = Deck.decks[sceneDeckId];

      // Add div for Deck
      console.log(`Adding Scene Deck: ${sceneDeck}`);
      sceneDeckDiv = document.createElement("div");
      sceneDeckDiv.classList.add("navigator-item");
      sceneDeckDiv.id = `SceneNav-${sceneDeck.id}`;
      sceneDeckDiv.innerHTML = sceneDeck.name;
      this.sceneNavigator.element.appendChild(sceneDeckDiv);

      sceneCardHolderDiv = document.createElement("div");
      sceneCardHolderDiv.style.paddingLeft = "10px";
      this.sceneNavigator.element.appendChild(sceneCardHolderDiv);

      for ( let sceneCardId of sceneDeck.cardIds ) {
        let sceneCard: Card = Card.cards[sceneCardId];

        // Add div for Card
        console.log(`Adding Scene Card: ${sceneCard.id}`);
        sceneCardDiv = document.createElement("div");
        sceneCardDiv.classList.add("navigator-item");
        sceneCardDiv.id = `SceneNav-${sceneCard.id}`;
        sceneCardDiv.innerHTML = sceneCard.name;

        sceneCardHolderDiv.appendChild(sceneCardDiv);
      }
    }
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
