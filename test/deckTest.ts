import { expect } from "chai";
import "mocha";

import Card from "../src/card";
import Deck from "../src/deck";

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
      deck1 = new Deck("Scene");
      card1 = new Card();
      card2 = new Card();
    });

    it("should be able to add one Card to a new Deck, using an array of cardIds", () => {
      let newCardIdList: string[] = [ card1.id ];
      let newCardList: any = {};
      newCardList[card1.id] = card1;

      deck1.cardIds = newCardIdList;
      expect(deck1.cardIds).to.be.deep.equal(newCardIdList);
      expect(deck1.cards).to.be.deep.equal(newCardList);
    });

    it("should be able to add multiple Cards to a new Deck, using an array of cardIds", () => {
      let newCardIdList: string[] = [ card1.id, card2.id ];
      let newCardList: any = {};
      newCardList[card1.id] = card1;
      newCardList[card2.id] = card2;

      deck1.cardIds = newCardIdList;
      expect(deck1.cardIds).to.be.deep.equal(newCardIdList);
      expect(deck1.cards).to.include(newCardList);
    });

    it("should be able to add one Card with Deck.addCard(), and only contain that one Card", () => {
      deck1.addCard(card1);
      expect(deck1.cardIds).to.include(card1.id);
      expect(deck1.cards[card1.id]).to.be.deep.equal(card1);
      expect(deck1.cardIds).to.not.include(card2.id);
    });

    it("should be able to add one Card with Deck.addCardId(), and only contain that one Card", () => {
      deck1.addCardId(card2.id);
      expect(deck1.cardIds).to.include(card2.id);
      expect(deck1.cards[card2.id]).to.be.deep.equal(card2);
      expect(deck1.cardIds).to.not.include(card1.id);
    });
  });

  context("When a Deck exists, with no Cards", () => {
    // declare variables here, so deck1 and newCardId
    // are shared between tests

    let deck1: Deck;
    let newCard: Card;
    let newCardId: string;

    before( () => {
      deck1  = new Deck("Scene");
      newCardId = deck1.newCard();
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
      expect(Card.cards).to.include(deck1.cards);
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
