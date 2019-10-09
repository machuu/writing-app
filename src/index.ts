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

/**
 * Text Editor
 */
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');

const EditorJS = require('@editorjs/editorjs');

const editorjs_storage_item = "editorjs_data";
let editorjs_data = {};

let default_editorjs_data={
  blocks: [
    {
    type: "paragraph",
      data: {
        text: "Sample Text. You can delete and overwrite this"
      }
    }
  ]
};

if ( localStorage.getItem(editorjs_storage_item) === null ) {
  console.log(`item '${editorjs_storage_item}' is not in localStorage`)
  editorjs_data = default_editorjs_data;
} else {
  console.log(`item '${editorjs_storage_item}' is in localStorage`)
  editorjs_data = JSON.parse( localStorage.getItem(editorjs_storage_item) );
}

let editor = new EditorJS({
  data: editorjs_data
});

saveButton.addEventListener('click', function () {
  editor.save().then((savedData: any) => {
    console.log(`Saving EditorJS: ${editorjs_storage_item}`);
    console.log(savedData);
    localStorage.setItem(editorjs_storage_item,JSON.stringify(savedData));
  });
});

loadButton.addEventListener('click', function () {
  console.log(`Retreiving EditorJS from localStorage: ${editorjs_storage_item}`);
  var retreived_editorjs = JSON.parse( localStorage.getItem(editorjs_storage_item) );
  console.log('retreived_editorjs: ', retreived_editorjs );
  // Assign retreived data to editor object
  editor.render(retreived_editorjs);
});

