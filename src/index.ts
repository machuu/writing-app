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

import Project from "./project";

let project: Project = new Project();
project.setupProjectWindow();
