import { expect } from "chai";
import "mocha";

import { Project } from "../src/project";

describe("Create a new Project", () => {
  it("should create a new Project instance", () => {
    let project: Project = new Project();
    expect(project.id).to.not.equal("");
  });
});

describe("A Project has Decks", () => {
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
