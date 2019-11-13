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
  let deck1: Deck;

  beforeEach( () => {
    deck1 = new Deck();
  });

  it("should be able to add a Deck", () => {
    let project1: Project = new Project();
    project1.decks = [ deck1 ];
  });

  it("should be able to create a new Deck", () => {
    let project1: Project = new Project();
    project1.newDeck("Scene");
    expect(project1.decks).to.not.equal("");
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
