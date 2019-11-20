import { expect } from "chai";
import "mocha";

import Deck from "../src/deck";

describe("Serialize/Deserialize", () => {
  let deck1JSON = {
      _attributes: {},
      _cardIds: [],
      _description: 'Deck 1 Description',
      _name: 'Deck 1 Name',
      _text: {},
      _id: 'Deck-2019-11-18T10:19:09.057Z_asdf'
  }
  let deck2JSON = {
      _attributes: {},
      _cardIds: [],
      _description: 'Deck 2 Description',
      _name: 'Deck 2 Name',
      _text: {},
      _id: 'Deck-2019-11-18T10:19:09.057Z_hjkl'
  }
  let deck1: Deck;
  let deck2: Deck;

  beforeEach( () => {
    deck1 = Deck.fromJSON(deck1JSON);
    deck2 = Deck.fromJSON(deck2JSON);
  });

  it("should create a new object from JSON", () => {
    expect(deck1.id).to.be.a("string").that.equals("Deck-2019-11-18T10:19:09.057Z_asdf");
  });

  it("toJSON() should match the JSON that created it, if no changes are made", () => {
    expect(deck1.toJSON()).to.be.deep.equal(deck1JSON);
  });

  it("toJSON() should not match the JSON that created it, if changes are made", () => {
    deck1.name = "Deck 1 Name, modified";
    expect(deck1.toJSON()).to.be.not.equal(deck1JSON);
  });
});

