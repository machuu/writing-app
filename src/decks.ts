export let cards: any = {};
export let decks: any = {};

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

  // Constructor
  constructor(idPrefix: string = "CARD") {
    this._id = idPrefix + "-" + new Date().toISOString();
    if (idPrefix === "CARD") {
      // Add this card to global card list
      AddCard(this);
    }
  }

  // Accessors
  public get id(): string          { return this._id; }
  public set id(newId: string)     { console.log("Card already has id: " + this.id); }

  public get name()                { return this._name; }
  public set name(newName: string) { this._name = newName; }

  public get description()                { return this._description; }
  public set description(newDesc: string) { this._description = newDesc; }

  // textJSON is JSON from Text Editor
  public get textJSON(): any { return this._text; }
  public set textJSON(newTextData: any) { this._text = newTextData; }

  // textString is stringified version of textJSON
  // The idea here is to translate between EditorJS data structure and plain strings
  // ... this is probably making it too complicated
  public get textString(): string        { return JSON.stringify(this.textJSON); }
  public set textString(newText: string) { this.textJSON = JSON.parse(newText); }

  public get attributes(): ICardAttribute[]                { return this._attributes; }
  public set attributes(cardAttributes: ICardAttribute[])  { this._attributes = cardAttributes; }
  public AddAttribute(newAttribute: ICardAttribute) { this._attributes.push( newAttribute ); }
  public RemoveAttribute(attributeName: string) { console.log(`Removing attribute: ${attributeName}`); }

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
}

export enum DeckType {
  REFERENCE = "Reference",
  SCENE     = "Scene",
}

export class Deck extends Card{
  // List of Card IDs in this deck
  private _cardIds: string[];

  private _deckType: string;

  constructor(deckType: string) {
    super(deckType + "-Deck");
    this._deckType = deckType;
    // 
    AddDeck(this);
  }

  public get deckType()                  { return this._deckType; }
  public set deckType(newType: string) { this._deckType = newType; }

  public get cardIds(): string[]          { return this._cardIds; }
  public set cardIds(cardIdList: string[] ) { this._cardIds = cardIdList; }

  public get cards(): Card[] {
    return this.cardIds.map( (cardId: string): Card => { return cards[cardId]; });
  }

  public set cards(cardArray: Card[]) {
    this.cardIds = cardArray.map( (card: Card): string => { return card.id; });
  }

  public addCard(cardId: string) {
    this._cardIds.push( cardId );
  }

  public removeCard(cardId: string) { 
    this.cardIds = this.cardIds.filter( (element: string) => { 
      return element !== cardId
    });
  }

  public newCard(): string {
    let newCard: Card = new Card();
    AddCard(newCard);
    this.addCard(newCard.id);
    return newCard.id;
  }

}

export function ResolveCardId(cardReference: string|Card|Deck) {
    if ( typeof cardReference === "string" ) {
      return cardReference;
    } else {
      return cardReference.id;
    }
}

export function AddCard(card: Card) {
  cards[card.id] = card;
}

export function GetCard(cardId: string): Card {
  return cards[cardId];
}

export function AddDeck(deck: Deck) {
  decks[deck.id] = deck;
}

export function GetDeck(deckId: string): Deck {
  return decks[deckId];
}

export default Deck;
