import { expect } from "chai";
import "mocha";

import NavMenu from "../src/navigation";

// Initialize DOM
this.jsdom = require("jsdom-global")();

describe("Creating a Navigator", () => {

  // Initialize document elements
  let navigatorContainer: HTMLElement    = document.createElement("div");
  let navigatorCloseButton: HTMLElement  = document.createElement("div");
  let navigatorOpenButton: HTMLElement   = document.createElement("div");
  let navigatorToggleButton: HTMLElement = document.createElement("div");

  beforeEach( () => {
    // Add elements to body
    document.body.appendChild(navigatorContainer);
    document.body.appendChild(navigatorCloseButton);
    document.body.appendChild(navigatorOpenButton);
    document.body.appendChild(navigatorToggleButton);

    // Assign element ids
    navigatorContainer.id    = "navigator";
    navigatorCloseButton.id  = `${navigatorContainer.id}-button-close`;
    navigatorOpenButton.id   = `${navigatorContainer.id}-button-open`;
    navigatorToggleButton.id = `${navigatorContainer.id}-button-toggle`;
  });

  it("should create a new Navigator", () => {
    let navigator: NavMenu = new NavMenu(navigatorContainer.id);
    expect(navigator.element).to.equal(navigatorContainer);
  });

  it("should auto assign an Close Button, if the right element id exists", () => {
    let navigator: NavMenu = new NavMenu(navigatorContainer.id);
    expect(navigator.close_button).to.equal(navigatorCloseButton);
  });

  it("should not auto assign an Close Button, if it the right element id doesn't exist", () => {
    // Change id of button, so it doesn't match navigatorContainer.id
    navigatorCloseButton.id = "foo";
    let navigator: NavMenu = new NavMenu(navigatorContainer.id);
    expect(navigator.close_button).to.equal(undefined);
  });

  it("should auto assign an Open Button, if the right element id exists", () => {
    let navigator: NavMenu = new NavMenu(navigatorContainer.id);
    expect(navigator.open_button).to.equal(navigatorOpenButton);
  });

  it("should not auto assign an Open Button, if it the right element id doesn't exist", () => {
    // Change id of button, so it doesn't match navigatorContainer.id
    navigatorOpenButton.id = "foo";
    let navigator: NavMenu = new NavMenu(navigatorContainer.id);
    expect(navigator.open_button).to.equal(undefined);
  });

  it("should auto assign an Toggle Button, if the right element id exists", () => {
    let navigator: NavMenu = new NavMenu(navigatorContainer.id);
    expect(navigator.toggle_button).to.equal(navigatorToggleButton);
  });

  it("should not auto assign an Toggle Button, if it the right element id doesn't exist", () => {
    // Change id of button, so it doesn't match navigatorContainer.id
    navigatorToggleButton.id = "foo";
    let navigator: NavMenu = new NavMenu(navigatorContainer.id);
    expect(navigator.toggle_button).to.equal(undefined);
  });
});

/*
describe("", function() {
  before ( function() {
  });
  it("", function() {
  });
});
*/
