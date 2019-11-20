import { expect } from "chai";
import "mocha";

import Project from "../src/project";

describe("Serialize/Deserialize", () => {
  let project1JSON = {
      _attributes: {},
      _description: 'Project 1 Description',
      _deckIds: [],
      _name: 'Project 1 Name',
      _text: {},
      _id: 'Project-2019-11-18T10:19:09.057Z_asdf'
  }
  let project2JSON = {
      _attributes: {},
      _description: 'Project 2 Description',
      _deckIds: [],
      _name: 'Project 2 Name',
      _text: {},
      _id: 'Project-2019-11-18T10:19:09.057Z_asdf'
  }
  let project1: Project;
  let project2: Project;

  beforeEach( () => {
    project1 = Project.fromJSON(project1JSON);
    project2 = Project.fromJSON(project2JSON);
  });

  it("should create a new object from JSON", () => {
    expect(project1.id).to.be.a("string").that.equals("Project-2019-11-18T10:19:09.057Z_asdf");
  });

  it("toJSON() should match the JSON that created it, if no changes are made", () => {
    expect(project1.toJSON()).to.be.deep.equal(project1JSON);
  });

  it("toJSON() should not match the JSON that created it, if changes are made", () => {
    project1.name = "Project 1 Name, modified";
    expect(project1.toJSON()).to.be.not.equal(project1JSON);
  });
});

