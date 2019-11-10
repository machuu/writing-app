import { expect } from "chai";
import "mocha";

import { Card, cards, Deck, decks } from "../src/decks";

describe("Create a new Card", () => {
  it("should create a new default Card instance", () => {
    let card1: Card = new Card();
    expect(card1.id).to.not.equal("");
  });
});

let card1: Card;
let card2: Card;
let card3: Card;

describe("Card Fields", () => {

  beforeEach( () => {
    card1 = new Card();
    card2 = new Card();
    card3 = new Card();
  });

  it("should update card state in 'cards' array when card 'name' is changed", () => {
    card1.name = "Card 1";
    expect( cards[card1.id] ).to.be.equal(card1);
  });

  it("should update card state in 'cards' array when card 'description' is changed", () => {
    card1.description = "Card 1 Description";
    expect( cards[card1.id] ).to.be.equal(card1);
  });

});

/*
describe("", () => {
  beforeEach( () => {
  });

  it("", () => {
  });
});
*/
