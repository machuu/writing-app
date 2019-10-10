/**
 * Service worker registration
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {

    /**
     * You can call register() every time a page loads without concern;
     * the browser will figure out if the service worker is already registered or not and handle it accordingly.
     */
    navigator.serviceWorker.register('./serviceWorker.js', {scope : "./"} ).then(function(registration) {

      // everything is ok
      console.log('ServiceWorker registration success, scope: ', registration.scope);

    }, function(err) {
      // an error occurred
      console.log('ServiceWorker registration failed: ', err);
    });


  });
}

/**
 * Navigation
 */
import NavMenu from "./navigation";

let sceneNavigator = new NavMenu('scene-navigator');
sceneNavigator.closed_width = "20px";
sceneNavigator.opened_width = "250px";

let cardNavigator = new NavMenu('card-navigator');
cardNavigator.closed_width = "20px";
cardNavigator.opened_width = "250px";

import TextEditor from "./editor";

let mainEditor = new TextEditor('editorjs');
mainEditor.addSaveButton('saveButton');
mainEditor.addLoadButton('loadButton');
