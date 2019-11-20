import { expect } from "chai";
import "mocha";

import Card from "../src/card";

describe("Serialize/Deserialize", () => {
  let card1JSON = {
      _attributes: {},
      _description: 'Card 1 Description',
      _name: 'Card 1 Name',
      _text: {},
      _id: 'Card-2019-11-18T10:19:09.057Z_asdf'
  }
  let card2JSON = {
      _attributes: {},
      _description: 'Card 2 Description',
      _name: 'Card 2 Name',
      _text: {},
      _id: 'Card-2019-11-18T10:19:09.057Z_hjkl'
  }
  let card1: Card;
  let card2: Card;

  beforeEach( () => {
    card1 = Card.fromJSON(card1JSON);
    card2 = Card.fromJSON(card2JSON);
  });

  it("should create a new object from JSON", () => {
    expect(card1.id).to.be.a("string").that.equals("Card-2019-11-18T10:19:09.057Z_asdf");
  });

  it("toJSON() should match the JSON that created it, if no changes are made", () => {
    expect(card1.toJSON()).to.be.deep.equal(card1JSON);
  });

  it("toJSON() should not match the JSON that created it, if changes are made", () => {
    card1.name = "Card 1 Name, modified";
    expect(card1.toJSON()).to.be.not.equal(card1JSON);
  });
});

