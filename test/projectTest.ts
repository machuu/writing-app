import { expect } from "chai";
import "mocha";

import { Project } from "../src/project";
import { Deck, decks } from "../src/decks";

describe("Create a new Project", () => {
  it("should create a new Project instance", () => {
    let project: Project = new Project();
    expect(project.id).to.not.equal("");
  });
});

describe("A Project has Decks", () => {
  context("When some decks already exist", () => {
    let project1: Project;
    let deck1: Deck;
    let deck2: Deck;

    beforeEach( () => {
      deck1 = new Deck("Scene");
      deck2 = new Deck("Reference");
      let project1: Project = new Project();
    });

    it("should be able to add one Deck to a new Project, using an array of deckIds", () => {
      let newDeckIdList: string[] = [ deck1.id ];
      let newDeckList: Deck[] = [ deck1 ];
      project1.deckIds = newDeckIdList;
      expect(project1.deckIds).to.be.equal(newDeckIdList);
      expect(project1.decks).to.be.equal(newDeckList);
    });

    it("should be able to add multiple Decks to a new Project, using an array of deckIds", () => {
      let newDeckIdList: string[] = [ deck1.id, deck2.id ];
      let newDeckList: Deck[] = [ deck1, deck2 ];
      project1.deckIds = newDeckIdList;
      expect(project.deckIds).to.be.equal(newDeckIdList);
      expect(project.decks).to.be.equal(newDeckList);
    });
  });

  context("When a Project exists, with no Decks", () => {
    // declare variables here, so project1 and newDeckId
    // are shared between tests

    let project1: Project;
    let newDeck: Deck;
    let newDeckId: string;

    beforeEach( () => {
      project1  = new Project();
      newDeckId = project1.newDeck("Scene");
      newDeck   = project1.decks[newDeckId];
    });

    it("should be able to create a new Deck, using Project.newDeck()", () => {
      expect(newDeckId).to.not.be.empty();
      expect(newDeck).to.not.be.empty();
    });

    it("and new deck is in Project.deckIds", () => {
      expect( project1.deckIds ).contains( newDeckId );
    });

    it("and new deck is in global decks list", () => {
      expect(decks[newDeckId]).to.be.equal(newDeck);
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
