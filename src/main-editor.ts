/**
 * Text Editor
 */
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');

const EditorJS = require('@editorjs/editorjs');
var editor = new EditorJS({
  data: {
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Sample Text. You can delete and overwrite this"
        }
      }
    ]
  }
});

saveButton.addEventListener('click', function () {
  editor.save().then((savedData: any) => {
    console.log("Saving EditorJS");
    console.log(savedData);
    localStorage.setItem('editorjs',JSON.stringify(savedData));
  });
});

loadButton.addEventListener('click', function () {
  console.log('Retreiving EditorJS');
  var retreived_editorjs = JSON.parse( localStorage.getItem('editorjs') );
  console.log('retreived_editorjs: ', retreived_editorjs );
  // Assign retreived data to editor object
  editor.render(retreived_editorjs);
});

