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
 * Sidebar Open/Close
 */
const openSceneNav  = document.getElementById('scene-navigator-button-open');
const closeSceneNav = document.getElementById('scene-navigator-button-close');

/* Set the width of the Scene Navigator to 250px */
openSceneNav.addEventListener('click', function () {
  document.getElementById("scene-navigator").style.width = "250px";
});

/* Set the width of the Scene Navigator to 0 */
closeSceneNav.addEventListener('click', function () {
  document.getElementById("scene-navigator").style.width = "0";
});

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

