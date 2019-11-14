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

  it("should update card state in 'cards' array when card 'attributes' is changed", () => {
    card1.attributes = [
      { "attribute1": "Card 1 Attribute 1"},
      { "attribute2": "Card 1 Attribute 2"},
    ];
    expect( cards[card1.id] ).to.be.equal(card1);
  });

});

describe("Create a new Deck", () => {
  it("should create a new Deck instance", () => {
    let deck: Deck = new Deck("Scene");
    expect(deck.id).to.not.equal("");
  });
});

describe("A Deck has Cards", () => {
  context("When some cards already exist", () => {
    let deck1: Deck;
    let card1: Card;
    let card2: Card;

    beforeEach( () => {
      card1 = new Card("Scene");
      card2 = new Card("Reference");
    });

    it("should be able to add one Card to a new Deck, using an array of cardIds", () => {
      let deck1: Deck = new Deck();
      let newCardIdList: string[] = [ card1.id ];
      let newCardList: any = {};
      newCardList[card1.id] = card1;

      deck1.cardIds = newCardIdList;
      expect(deck1.cardIds).to.be.deep.equal(newCardIdList);
      expect(deck1.cards).to.be.deep.equal(newCardList);
    });

    it("should be able to add multiple Cards to a new Deck, using an array of cardIds", () => {
      let deck1: Deck = new Deck();
      let newCardIdList: string[] = [ card1.id, card2.id ];
      let newCardList: any = {};
      newCardList[card1.id] = card1;
      newCardList[card2.id] = card2;

      deck1.cardIds = newCardIdList;
      expect(deck1.cardIds).to.be.deep.equal(newCardIdList);
      expect(deck1.cards).to.include(newCardList);
    });
  });

  context("When a Deck exists, with no Cards", () => {
    // declare variables here, so deck1 and newCardId
    // are shared between tests

    let deck1: Deck;
    let newCard: Card;
    let newCardId: string;

    before( () => {
      deck1  = new Deck();
      newCardId = deck1.newCard("Scene");
      newCard   = deck1.cards[newCardId];
    });

    it("should be able to create a new Card, using Deck.newCard()", () => {
      expect(deck1.cards).to.not.be.empty;
      expect(deck1.cardIds).to.be.an('array').that.is.not.empty;
    });

    it("and new card is in Deck.cardIds", () => {
      expect( deck1.cardIds ).to.be.an('array').that.includes( newCardId );
    });

    it("and new card is in global cards list", () => {
      expect(cards).to.include(deck1.cards);
    });
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
