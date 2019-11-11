import { expect } from "chai";
import "mocha";

import { Project } from "../src/project";

describe("Create a new Project", () => {
  it("should create a new Project instance", () => {
    let project: Project = new Project();
    expect(project.id).to.not.equal("");
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
