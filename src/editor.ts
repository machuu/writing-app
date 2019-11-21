/**
 * Text Editor
 */
import EditorJS from "@editorjs/editorjs";

let defaultTextEditorData: any = {
  blocks: [
    {
      data: {
        text: "Sample Text. You can delete and overwrite this",
      },
      type: "paragraph",
    },
  ],
};

class TextEditor {

  private editor: any;
  private defaultElementId: string = "editorjs";
  private elementId: string;
  private _element: HTMLElement;
  private defaultDataId: string = "textEditorData";
  private defaultData: any;
  private dataId: string;
  private _data: any = {};

  constructor(elementId: string = null, initData: any = defaultTextEditorData ) {
    if ( elementId == null ) {
      this.elementId = this.defaultElementId;
    } else {
      this.elementId = elementId;
    }

    if ( document.getElementById(this.elementId) ) {
      this.element = document.getElementById(this.elementId);
    } else {
      console.log(`Unable to Initialize Text Editor in Element with id '${this.elementId}'`);
      return;
    }

    this.defaultData = defaultTextEditorData;
    if ( initData == null ) {
      initData = this.defaultData;
    }

    this.dataId = this.defaultDataId;

    this.editor = new EditorJS({
      data:     initData,
      holder: this.element.id,
    });
  }

  public get element() {
    return this._element;
  }

  public set element(givenElement: HTMLElement) {
    if ( this._element == null ) {
      this._element = givenElement;
      console.log(`Setting Text Editor Element to element with id '${givenElement.id}'`);
    } else {
      console.log(`Can not change Text Editor element '${this.element.id}' -> '${givenElement.id}'`);
    }
  }

  // Start new content
  public reset(): void {
    this.data = this.defaultData;
    this.dataId = this.defaultDataId;
  }

  public addSaveButton(saveButtonId: string): void {
    if ( document.getElementById(saveButtonId) ) {
      document.getElementById(saveButtonId).addEventListener("click", () => { this.save(); });
    }
  }

  public addLoadButton(loadButtonId: string): void {
    if ( document.getElementById(loadButtonId) ) {
      document.getElementById(loadButtonId).addEventListener("click", () => { this.load(); });
    }
  }

  // retreive dataId from storage, then render in Text Editor
  public load(dataId: string = "" ): void {
    if ( dataId === "" ) {
      dataId = this.promptForDataId();
    }
    console.log(`Retreiving EditorJS from localStorage: ${dataId}`);
    let retreivedData = JSON.parse( localStorage.getItem(dataId) );
    console.log("retreived_data: ", retreivedData );
    this.editor.render(retreivedData);
  }

  // save data from Text Editor into dataId
  public save(dataId: string = ""): void {
    if ( dataId === "" ) {
      dataId = this.promptForDataId();
    }

    this.editor.save().then((savedData: any) => {
        console.log(`Saving Editor Data: ${dataId}`);
        console.log(savedData);
        localStorage.setItem(dataId, JSON.stringify(savedData));
      });
  }

  // return JSON object of Text Editor Data
  public get data() {
    return this._data;
  }

  // assign JSON object to Text Editor Data
  public set data(data: any) {
    this._data = data;
    this.renderData(this.data);
  }

  private confirmOverwriteOld(dataId: string): boolean {
    return confirm(`Overwrite existing saved data with id '${dataId}'` );
  }

  private promptForDataId(): string {
    return prompt("Enter ID for Editor Data:");
  }

  private dataIdExists(dataId: string) {
    return ( localStorage.getItem(dataId) === null );
  }

  private renderData(data: any) {
    this.editor.render(data);
  }
}

export default TextEditor;
