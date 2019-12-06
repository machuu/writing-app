/**
 * Service worker registration
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {

    /**
     * You can call register() every time a page loads without concern
     * the browser will figure out if the service worker is already registered or not and handle it accordingly.
     */
    navigator.serviceWorker.register("./serviceWorker.js", {scope : "./"} ).then( (registration) => {

      // everything is ok
      console.log("ServiceWorker registration success, scope: ", registration.scope);

    }, (err) => {
      // an error occurred
      console.log("ServiceWorker registration failed: ", err);
    });

  });
}

import loglevel from "loglevel";
const log = loglevel.getLogger("Global");
log.setDefaultLevel("debug");

import Card from "./card";
import Deck from "./deck";
import Project from "./project";


let project: Project = new Project();
project.setupProjectWindow();

let sceneDeck1: Deck = Deck.decks[project.newSceneDeck()];
let sceneDeck2: Deck = Deck.decks[project.newSceneDeck()];

sceneDeck1.name = "Scene Deck 1"
sceneDeck2.name = "Scene Deck 2"

let sceneDeck1Card1: Card = Card.cards[sceneDeck1.newCard()];
let sceneDeck1Card2: Card = Card.cards[sceneDeck1.newCard()];
let sceneDeck2Card1: Card = Card.cards[sceneDeck2.newCard()];
let sceneDeck2Card2: Card = Card.cards[sceneDeck2.newCard()];

sceneDeck1Card1.name = "Card 1";
sceneDeck1Card2.name = "Card 2";
sceneDeck2Card1.name = "Card 1";
sceneDeck2Card2.name = "Card 2";

log.trace(project);
project.populateNavigators();
