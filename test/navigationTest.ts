import { expect } from "chai";
import "mocha";

import NavMenu from "../src/navigation";


// Initialize DOM
this.jsdom = require('jsdom-global')();

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
});

/*
describe("", function() {
  before ( function() {
  });
  it("", function() {
  });
});
*/
