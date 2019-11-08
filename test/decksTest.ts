import { expect } from "chai";
import "mocha";

import {Card,cards,Deck,decks} from "../src/decks";

describe("Create a new Card", () => {
  it("should create a new Card object", () => {
    let card1: Card = new Card();
    expect(card1.id).to.not.equal("");
  });
});

