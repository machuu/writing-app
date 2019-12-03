import BaseCard from "./baseCard";
import Card from "./card";
import loglevel from "loglevel";

const logGlobal = loglevel.getLogger("Global");
const log = loglevel.getLogger("Deck");
log.setDefaultLevel(logGlobal.getLevel());

export interface IDeckJSON {
  _attributes: any;
  _cardIds: string[];
  _description: string;
  _id: string;
  _name: string;
  _text: any;
}

export class Deck extends BaseCard {
  // List of Card IDs in this deck
  private _cardIds: string[] = [];
  private _deckType: string;

  private static _decks: any = {};

  constructor(deckType: string) {
    super(deckType.toUpperCase() + "-DECK");
    this._deckType = deckType;
    this.updateGlobal();
  }

  protected updateGlobal(): void {
    Deck.decks[this.id] = this;
  }

  public get deckType()                  { return this._deckType; }
  public set deckType(newType: string) {
    this._deckType = newType;
    this.updateGlobal();
  }

  public get cardIds(): string[]          { return this._cardIds; }
  public set cardIds(cardIdList: string[] ) {
    this._cardIds = cardIdList;
    this.updateGlobal();
  }

  public get cards(): any {
    let cardsObject: any = {};
    this.cardIds.forEach( (cardId: string) => {
      cardsObject[cardId] = Card.cards[cardId]
    });
    return cardsObject;
  }
  public set cards(cardsObject: any) {
    this.cardIds = cardsObject.map( (cardId: string, card: Card): string => { return cardId; });
    this.updateGlobal();
  }

  public newCard(): string {
    let newCard: Card = new Card();
    this._cardIds.push(newCard.id);
    this.updateGlobal();
    return newCard.id;
  }

  public addCard(card: Card) {
    this._cardIds.push( card.id );
    this.updateGlobal();
  }

  public addCardId(cardId: string) {
    this._cardIds.push( cardId );
    this.updateGlobal();
  }

  public removeCard(cardId: string) {
    this.cardIds = this.cardIds.filter( (element: string) => {
      return element !== cardId;
    });
    this.updateGlobal();
  }

  // JSON Helpers
  // per: http://choly.ca/post/typescript-json/
  public toJSON(): IDeckJSON {
    return Object.assign({}, this, {
      // explicitly assign protected fields
      _attributes:  this._attributes,
      _cardIds:     this._cardIds,
      _description: this._description,
      _id:          this._id,
      _name:        this._name,
      _text:        this._text,
    });
  }

  public static fromJSON(deckJSON: IDeckJSON): Deck {
    // Assign JSON to new Deck object
    let deckAssigned: Deck  = Object.assign(Object.create(Deck.prototype), deckJSON);
    Deck.decks[deckAssigned.id] = deckAssigned;
    return deckAssigned;
  }

  public static reviver(key: string, value: any): any {
    return key === "" ? Deck.fromJSON(value) : value;
  }


  public static get decks(): any {
    return Deck._decks;
  }
  public static set decks(decksObject: any) {
    Deck._decks = decksObject;
  }
}

export default Deck;
