import BaseCard from "./baseCard";
import Card from "./card";

export enum DeckType {
  REFERENCE = "Reference",
  SCENE     = "Scene",
}

export class Deck extends BaseCard {
  // List of Card IDs in this deck
  private _cardIds: string[] = [];
  private _deckType: string;

  private static _decks: any = {};

  constructor(deckType: string) {
    super(deckType + "-Deck");
    this._deckType = deckType;
    this.updateGlobal();
  }

  private updateGlobal(): void {
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

  public static get decks(): any {
    return Deck._decks;
  }
  public static set decks(decksObject: any) {
    Deck._decks = decksObject;
  }
}

export default Deck;
