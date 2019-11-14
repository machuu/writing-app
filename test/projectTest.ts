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
      project1 = new Project();
      deck1 = new Deck("Scene");
      deck2 = new Deck("Reference");
    });

    it("should be able to add one Deck to a new Project, using an array of deckIds", () => {
      let newDeckIdList: string[] = [ deck1.id ];
      let newDeckList: any = {};
      newDeckList[deck1.id] = deck1;

      project1.deckIds = newDeckIdList;
      expect(project1.deckIds).to.be.deep.equal(newDeckIdList);
      expect(project1.decks).to.be.deep.equal(newDeckList);
    });

    it("should be able to add multiple Decks to a new Project, using an array of deckIds", () => {
      let newDeckIdList: string[] = [ deck1.id, deck2.id ];
      let newDeckList: any = {};
      newDeckList[deck1.id] = deck1;
      newDeckList[deck2.id] = deck2;

      project1.deckIds = newDeckIdList;
      expect(project1.deckIds).to.be.deep.equal(newDeckIdList);
      expect(project1.decks).to.include(newDeckList);
    });

    it("should be able to add one Deck with Project.addDeck(), and only contain that one Deck", () => {
      project1.addDeck(deck1)
      expect(project1.deckIds).to.include(deck1.id);
      expect(project1.decks[deck1.id]).to.be.deep.equal(deck1);
      expect(project1.deckIds).to.not.include(deck2.id);
    });

    it("should be able to add one Deck with Project.addDeckId(), and only contain that one Deck", () => {
      project1.addDeckId(deck2.id)
      expect(project1.deckIds).to.include(deck2.id);
      expect(project1.decks[deck2.id]).to.be.deep.equal(deck2);
      expect(project1.deckIds).to.not.include(deck1.id);
    });
  });

  context("When a Project exists, with no Decks", () => {
    // declare variables here, so project1 and newDeckId
    // are shared between tests

    let project1: Project;
    let newDeck: Deck;
    let newDeckId: string;

    before( () => {
      project1  = new Project();
      newDeckId = project1.newDeck("Scene");
      newDeck   = project1.decks[newDeckId];
    });

    it("should be able to create a new Deck, using Project.newDeck()", () => {
      expect(project1.decks).to.not.be.empty;
      expect(project1.deckIds).to.be.an('array').that.is.not.empty;
    });

    it("and new deck is in Project.deckIds", () => {
      expect( project1.deckIds ).to.be.an('array').that.includes( newDeckId );
    });

    it("and new deck is in global decks list", () => {
      expect(decks).to.include(project1.decks);
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
