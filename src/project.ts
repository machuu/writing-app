import BaseCard from "./baseCard";
import Deck from "./deck";
import Card from "./card";
import loglevel from "loglevel";
import NavMenu from "./navigation";
import TextEditor from "./editor";

const logGlobal = loglevel.getLogger("Global");
const log = loglevel.getLogger("Project");
log.info(`Global Log Level: ${logGlobal.getLevel()}`);
log.setLevel(logGlobal.getLevel());
log.info(`Project Log Level: ${log.getLevel()}`);

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
  public cardInfoElement: HTMLElement;
  public saveButton: HTMLElement;
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
    if ( this.deckIds === undefined ) {
      return [];
    }

    let filterRegex = RegExp(filterString, "i");
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
    return this.getFilteredDeckIds("^SCENE");
  }
  public get referenceDeckIds(): string[] {
    return this.getFilteredDeckIds("^REFERENCE");
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
    log.info(`Add new Deck to Project: ${newDeck.id}`);
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

  public handleEvent(event: any) {

    switch( event.type ) {
      case "click":
        log.trace(event);
        log.trace(`Got a click on ${event.target.id}`);
        this.handleClickEvent(event);
        break;
      default:
        return;
    }
  }

  private handleClickEvent(event: any) {

    log.trace("Handling Click");
    let target: HTMLElement = event.target;
    let clickAction: string = target.getAttribute("clickAction");

    switch ( clickAction.toUpperCase() ) {
      case "NEWCARD":
        // Add a new Card to deckId in element name
        let deckId: string = event.target.getAttribute("deckId");
        let newCardId: string = Deck.decks[deckId].newCard();
        Card.cards[newCardId].name = "NewCard";
        log.debug(`Added Card '${newCardId}' to Deck '${deckId}'`);
        this.updateGlobal();
        break;
      case "NEWDECK":
        let deckType: string = event.target.getAttribute("deckType");
        let newDeckId: string = this.newDeck(deckType);
        Deck.decks[newDeckId].name = "NewDeck";
        log.debug(`Added Deck '${newDeckId}'`);
        this.updateGlobal();
        break;
      case "LOADSCENECARD":
        let cardId: string = event.target.getAttribute("cardId");
        this.loadCardIntoEditor(cardId);
        break;
      case "SAVESCENECARD":
        this.saveCardFromEditor();
      default:
        log.warn(`unknown click action '${clickAction}' on id: ${target.id}`);
        return;
    }
  }

  public setupProjectWindow() {
    this.sceneNavigator = new NavMenu("scene-navigator");
    this.sceneNavigator.closed_width = "20px";
    this.sceneNavigator.opened_width = "250px";

    this.referenceNavigator = new NavMenu("reference-navigator");
    this.referenceNavigator.closed_width = "20px";
    this.referenceNavigator.opened_width = "250px";

    this.mainEditor = new TextEditor("mainEditor");
    this.mainEditor.element.setAttribute("activeCardId", "");

    this.cardInfoElement = document.getElementById("mainEditorCardInfo");
    this.cardInfoElement.innerHTML = "Blank Card";

    this.saveButton = document.getElementById("saveButton");
    this.saveButton.setAttribute("clickAction", "saveSceneCard");
    this.saveButton.addEventListener("click", this, false);
  }

  public populateNavigators() {
    this.populateNavigator("Scene");
    this.populateNavigator("Reference");
  }

  private populateNavigator(argNavigatorType: string) {
    let deckHolderDiv: HTMLElement;
    let deckHolderDivId: string;
    let deckDiv: HTMLElement;
    let cardHolderDiv: HTMLElement;
    let cardDiv: HTMLElement;

    let navigatorType: string = argNavigatorType.toUpperCase();
    log.info(`Populating Navigator Type: ${navigatorType}`);
    let navigator: NavMenu;
    let deckIds: string[];

    switch( navigatorType ) {
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
        log.warn(`Unkown Navigator Type: ${navigatorType}`);
    }

    if ( navigator === undefined ) {
      return;
    }

    // Remove old Deck/Card list, if it already exists
    deckHolderDivId = `${navigatorType}-DeckHolder`;
    this.deepRemoveElement(deckHolderDivId);

    // Create new Deck Holder Div and add to Navigator
    deckHolderDiv = document.createElement("div");
    deckHolderDiv.id = deckHolderDivId;
    navigator.element.appendChild(deckHolderDiv);

    for ( let deckId of deckIds ) {
      let deck: Deck = Deck.decks[deckId];

      // Add div for Deck
      log.trace(`Adding Deck: ${deck.id}`);
      deckDiv = document.createElement("div");
      deckDiv.classList.add("navigator-item");
      deckDiv.id = `${navigatorType}_${deck.id}`;
      deckDiv.innerHTML = deck.name;
      deckDiv.setAttribute("deckId", deckId);
      deckHolderDiv.appendChild(deckDiv);

      cardHolderDiv = document.createElement("div");
      cardHolderDiv.style.paddingLeft = "10px";
      cardHolderDiv.id = `CardHolder-${deckDiv.id}`;
      deckHolderDiv.appendChild(cardHolderDiv);

      for ( let cardId of deck.cardIds ) {
        let card: Card = Card.cards[cardId];

        // Add div for Card
        log.trace(`Adding Card: ${card.id}`);
        cardDiv = document.createElement("div");
        cardDiv.classList.add("navigator-item");
        cardDiv.id = `LoadCard_${navigatorType}_${card.id}`;
        cardDiv.innerHTML = card.name;
        cardDiv.setAttribute("cardId", cardId);
        cardDiv.setAttribute("clickAction", `load${navigatorType}Card`);
        cardDiv.setAttribute("navigatorType", navigatorType);
        cardDiv.addEventListener("click", this, false);

        cardHolderDiv.appendChild(cardDiv);
      }

      // Add button for New Card
      log.trace(`Adding New Card Button`);
      cardDiv = document.createElement("div");
      cardDiv.classList.add("navigator-item");
      cardDiv.id = `NewCard_${deckId}`;
      cardDiv.innerHTML = "+ New Card";
      cardDiv.setAttribute("deckId", deckId);
      cardDiv.setAttribute("clickAction", "NewCard");
      cardHolderDiv.appendChild(cardDiv);
      cardDiv.addEventListener("click", this, false );
    }

    // Add button for New Deck
    log.trace(`Adding New Deck Button`);
    deckDiv = document.createElement("div");
    deckDiv.classList.add("navigator-item");
    deckDiv.id = `NewDeck_${navigatorType}`;
    deckDiv.innerHTML = "+ New Deck";
    deckDiv.setAttribute("deckType", navigatorType);
    deckDiv.setAttribute("clickAction", "NewDeck");
    deckHolderDiv.appendChild(deckDiv);
    deckDiv.addEventListener("click", this, false);
  }

  private deepRemoveElement(targetElementId: string ) {
    let targetElement: HTMLElement;
    if ( document.getElementById(targetElementId) ) {
      targetElement = document.getElementById(targetElementId);
      log.trace(`Removing children of Element: ${targetElementId}`);
      while ( targetElement.hasChildNodes() ) {
        log.trace(`Removing childNode: '${targetElement.firstChild.nodeName}'`);
        log.trace(targetElement.firstChild)
        this.deepRemoveNode( targetElement.firstChild );
      }
      log.trace(`Removing Element: ${targetElementId}`);
      targetElement.remove();
    }
  }

  private deepRemoveNode(targetNode: Node) {
    log.trace(`Removing children of Node: ${targetNode.nodeName}`);
    while ( targetNode.hasChildNodes() ) {
      log.trace(`Removing child: '${targetNode.firstChild.nodeName}'`);
      log.trace(targetNode.firstChild)
      this.deepRemoveNode( targetNode.firstChild );
    }
    log.trace(`Removing Node: ${targetNode.nodeName}`);
    targetNode.parentNode.removeChild(targetNode);

  }

  public loadCardIntoEditor(cardIdToLoad: string): void {
    log.debug(`Loading data from ${cardIdToLoad} into mainEditor`);

    let activeCardId: string = this.mainEditor.element.getAttribute("activeCardId");
    if ( activeCardId == cardIdToLoad ) {
      log.debug(`This cardId is already loaded`);
      return;
    }

    // Save activeCardId before loading new data into Editor
    this.saveCardFromEditor();

    let cardToLoad: Card = Card.cards[cardIdToLoad];
    log.debug(cardToLoad);

    log.trace(`Updating Editor Title to ${cardToLoad.name}`);
    this.cardInfoElement.innerHTML = cardToLoad.name;

    log.trace(`Setting activeCardId to: ${cardToLoad.id}`);
    this.mainEditor.element.setAttribute("activeCardId", cardToLoad.id);

    log.debug(`Loading Card Text into Editor`);
    log.debug(cardToLoad.text);
    this.mainEditor.load(cardToLoad.text).then( () => {
      log.info(`Finished Loading Text Data from ${cardIdToLoad} into Text Editor`);
    }).catch( (error: any) => {
      log.error(`Error Loading Text Data from ${cardIdToLoad} into Text Editor`);
    });

    this.sceneNavigator.close();
  }

  public saveCardFromEditor(): void {
    let cardIdToSave: string = this.mainEditor.element.getAttribute("activeCardId");
    if (cardIdToSave == "") {
      // No Active Card, so nothing to save
      log.debug(`No activeCardId found in mainEditor`);
    } else {
      log.debug(`Saving data from mainEditor into ${cardIdToSave}`);
      let cardToSave: Card = Card.cards[cardIdToSave];
      log.trace(`Card before save`);
      log.trace(cardToSave);

      log.trace(`Updating Card Name from Editor Title: ${this.cardInfoElement.innerHTML}`);
      cardToSave.name = this.cardInfoElement.innerHTML;

      log.trace(`Saving Text from Editor`);
      // Text Editor uses a Promise to save, so mainEditor.save() will return the promise
      this.mainEditor.save().then( (savedText: any) => {
        log.debug(`Project got savedText from Editor: `, savedText);
        cardToSave.text = savedText;
        log.debug(`Finished saving Card: `, cardToSave);
      }).catch( (error: any) => {
        log.error(`Failed to save Text: `, error)
      });

      this.updateGlobal();
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
