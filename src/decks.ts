export interface ICardAttribute {
  name: string;
  value: string;
}

export interface ICardJSON {
  _attributes: ICardAttribute[];
  _description: string;
  _id: string;
  _name: string;
  _text: any;
}

export class Card {
  private _attributes: ICardAttribute[] = []; // array of Card Attributes
  private _id: string; // unique ID
  private _description: string = ""; // Descriptive Name
  private _name: string = ""; // Descriptive Name
  private _text: any = {};   // Text Editor Content: JSON

  private static _cards: any = {};

  // Constructor
  constructor(idPrefix: string = "CARD") {
    // ID is a combination of:
    //   - Prefix - description of what kind of Card this is
    //   - Datetime - ISO Datetime when Card is created
    //   - Random Suffix - to differentiate cards created in the same millisecond
    this._id = idPrefix
      + "-"
      + new Date().toISOString()
      + "_"
      + Math.random().toString(36).substring(2,6);

    if (idPrefix === "CARD") {
      // Add this card to global card list
      Card.cards[this.id] = this;
    }
  }

  // Accessors
  public get id(): string      { return this._id; }
  public set id(newId: string) {
    console.log("Card already has id: " + this.id);
  }

  public get name()                { return this._name; }
  public set name(newName: string) {
    this._name = newName;
    this.updateGlobal();
  }

  public get description()                { return this._description; }
  public set description(newDesc: string) {
    this._description = newDesc;
    this.updateGlobal();
  }

  // textJSON is JSON from Text Editor
  public get textJSON(): any { return this._text; }
  public set textJSON(newTextData: any) {
    this._text = newTextData;
    this.updateGlobal();
  }

  // textString is stringified version of textJSON
  // The idea here is to translate between EditorJS data structure and plain strings
  // ... this is probably making it too complicated
  public get textString(): string        { return JSON.stringify(this.textJSON); }
  public set textString(newText: string) { this.textJSON = JSON.parse(newText); }

  public get attributes(): ICardAttribute[]                { return this._attributes; }
  public set attributes(cardAttributes: ICardAttribute[])  {
    this._attributes = cardAttributes;
    this.updateGlobal();
  }

  public AddAttribute(newAttribute: ICardAttribute) {
    this._attributes.push( newAttribute );
    this.updateGlobal();
  }
  public RemoveAttribute(attributeName: string) {
    console.log(`Removing attribute: ${attributeName}`);
    this.updateGlobal();
  }

  public updateGlobal(): void {
    Card.cards[this.id] = this;
  }

  // JSON Helpers
  // per: http://choly.ca/post/typescript-json/
  public toJSON(): ICardJSON {
    return Object.assign({}, this, {
      // explicitly assign private fields
      _attributes: this._attributes,
      _description: this._description,
      _id: this._id,
      _name: this._name,
      _text: this._text,
    });
  }

  public static fromJSON(cardJSON: ICardJSON): Card {
    // Only let this happen once
    // I think 'static' might satisfy that

    // Assign JSON to new Card object
    let card = Object.create(Card.prototype);
    return Object.assign(card, cardJSON);
  }

  public static reviver(key: string, value: any): any {
    return key === "" ? Card.fromJSON(value) : value;
  }

  public static get cards(): any {
    return Card._cards;
  }
  public static set cards(cardsObject: any) {
    Card._cards = cardsObject;
  }
}

export enum DeckType {
  REFERENCE = "Reference",
  SCENE     = "Scene",
}

export class Deck extends Card {
  // List of Card IDs in this deck
  private _cardIds: string[] = [];

  private _deckType: string;

  private static _decks: any = {};

  constructor(deckType: string) {
    super(deckType + "-Deck");
    this._deckType = deckType;
    Deck.decks[this.id] = this;
  }

  public get deckType()                  { return this._deckType; }
  public set deckType(newType: string) { this._deckType = newType; }

  public get cardIds(): string[]          { return this._cardIds; }
  public set cardIds(cardIdList: string[] ) { this._cardIds = cardIdList; }

  public get cards(): any {
    let cardsObject: any = {};
    this.cardIds.forEach( (cardId: string) => {
      cardsObject[cardId] = Card.cards[cardId]
    });
    return cardsObject;
  }
  public set cards(cardsObject: any) {
    this.cardIds = cardsObject.map( (cardId: string, card: Card): string => { return cardId; });
  }

  public newCard(): string {
    let newCard: Card = new Card();
    this._cardIds.push(newCard.id);
    return newCard.id;
  }

  public addCard(card: Card) {
    this._cardIds.push( card.id );
  }

  public addCardId(cardId: string) {
    this._cardIds.push( cardId );
  }

  public removeCard(cardId: string) {
    this.cardIds = this.cardIds.filter( (element: string) => {
      return element !== cardId;
    });
  }

  public static get decks(): any {
    return Deck._decks;
  }
  public static set decks(decksObject: any) {
    Deck._decks = decksObject;
  }
}

export default Deck;
