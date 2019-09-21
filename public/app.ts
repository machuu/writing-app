const saveButton = document.getElementById('saveButton');
const EditorJS = require('@editorjs/editorjs');
var editor = new EditorJS();

saveButton.addEventListener('click', function () {
  editor.save().then((savedData: any) => {
    console.log("Saving EditorJS");
    console.log(savedData);
  });
});

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
