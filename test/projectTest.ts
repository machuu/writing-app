import { expect } from "chai";
import "mocha";

import Project from "../src/project";
import Deck from "../src/deck";

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
      expect(Deck.decks).to.include(project1.decks);
    });
  });

  context("When a Project exists, with 2 Reference and 2 Scene decks", () => {
    // declare variables here, so they are in scope during it()
    // after being set in beforeEach()

    let project1: Project;
    let sceneDeck1: Deck;
    let sceneDeck2: Deck;
    let referenceDeck1: Deck;
    let referenceDeck2: Deck;
    let allDeckIds: string[] = [];
    let allDecksObject: any = {};
    let referenceDeckIds: string[] = [];
    let referenceDecksObject: any = {};
    let sceneDeckIds: string[] = [];
    let sceneDecksObject: any = {};

    beforeEach( () => {
      project1  = new Project();
      let referenceDeck1Id: string = project1.newDeck("Reference");
      let referenceDeck2Id: string = project1.newDeck("Reference");
      let sceneDeck1Id: string     = project1.newDeck("Scene");
      let sceneDeck2Id: string     = project1.newDeck("Scene");
      referenceDeck1   = project1.decks[referenceDeck1Id];
      referenceDeck2   = project1.decks[referenceDeck2Id];
      sceneDeck1       = project1.decks[sceneDeck1Id];
      sceneDeck2       = project1.decks[sceneDeck2Id];

      allDeckIds.push(referenceDeck1.id);
      allDeckIds.push(referenceDeck2.id);
      allDeckIds.push(sceneDeck1.id);
      allDeckIds.push(sceneDeck2.id);
      allDecksObject[referenceDeck1.id] = referenceDeck1;
      allDecksObject[referenceDeck2.id] = referenceDeck2;
      allDecksObject[sceneDeck1.id] = sceneDeck1;
      allDecksObject[sceneDeck2.id] = sceneDeck2;

      referenceDeckIds.push(referenceDeck1.id);
      referenceDeckIds.push(referenceDeck2.id);
      referenceDecksObject[referenceDeck1.id] = referenceDeck1;
      referenceDecksObject[referenceDeck2.id] = referenceDeck2;

      sceneDeckIds.push(sceneDeck1.id);
      sceneDeckIds.push(sceneDeck2.id);
      sceneDecksObject[sceneDeck1.id] = sceneDeck1;
      sceneDecksObject[sceneDeck2.id] = sceneDeck2;
    });

    afterEach( () => {
      allDeckIds = [];
      allDecksObject = {};
      referenceDeckIds = [];
      referenceDecksObject = {};
      sceneDeckIds = [];
      sceneDecksObject = {};
    });

    it("should return 4 Decks", () => {
      expect( project1.deckIds ).to.be.an('array').that.has.lengthOf(4);
      expect( project1.deckIds ).to.be.deep.equal(allDeckIds);
      expect( project1.decks   ).to.be.deep.equal(allDecksObject);
    });

    it("should return only 2 Scene Decks", () => {
      expect( project1.sceneDeckIds ).to.be.an('array').that.has.lengthOf(2);
      expect( project1.sceneDeckIds ).to.be.deep.equal(sceneDeckIds);
      expect( project1.sceneDecks   ).to.be.deep.equal(sceneDecksObject);
    });


    it("should return only 2 Reference Decks", () => {
      expect( project1.referenceDeckIds ).to.be.deep.equal(referenceDeckIds);
      expect( project1.referenceDecks   ).to.be.deep.equal(referenceDecksObject);
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
