import BaseCard from "./baseCard";


export interface ICardJSON {
  _attributes: ICardAttribute[];
  _description: string;
  _id: string;
  _name: string;
  _text: any;
}

export class Card extends BaseCard {
  private static _cards: any = {};

  constructor() {
    super("Card");
    this.updateGlobal();
  }

  protected updateGlobal(): void {
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

export default Card;
