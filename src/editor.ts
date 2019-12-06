/**
 * Text Editor
 */
import EditorJS from "@editorjs/editorjs";
import loglevel from "loglevel";

const logGlobal = loglevel.getLogger("Global");
const log = loglevel.getLogger("TextEditor");
log.setDefaultLevel(logGlobal.getLevel());

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
      log.error(`Unable to Initialize Text Editor in Element with id '${this.elementId}'`);
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
      log.debug(`Setting Text Editor Element to element with id '${givenElement.id}'`);
    } else {
      log.error(`Can not change Text Editor element '${this.element.id}' -> '${givenElement.id}'`);
    }
  }

  // Start new content
  public reset(): void {
    this.data = this.defaultData;
    this.dataId = this.defaultDataId;
  }

  public load(newText: any) {

    if (newText["blocks"] == undefined ) {
      newText = {
        blocks: [
          {
            data: {
              text: ""
            },
            type: "paragraph",
          },
        ],
      }
      log.debug(`Given text data is empty, replace with properly formatted JSON`, newText);
    }
    log.info("Loading Text Data: ", newText);
    return this.editor.render(newText);
  }

  public save(): any {
    log.info(`Fetching Editor Text Data`);
    return this.editor.save();
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

  private renderData(data: any) {
    this.editor.render(data);
  }
}

export default TextEditor;
