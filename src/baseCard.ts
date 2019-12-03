import loglevel from "loglevel";

const logGlobal = loglevel.getLogger("Global");
const log = loglevel.getLogger("BaseCard");
log.setDefaultLevel(logGlobal.getLevel());

export abstract class BaseCard {
  protected _attributes: any = {}; // array of Card Attributes
  protected _id: string; // unique ID
  protected _description: string = ""; // Descriptive Name
  protected _name: string = ""; // Descriptive Name
  protected _text: any = {};   // Text Editor Content: JSON

  // Constructor
  constructor(idPrefix: string = "CARD") {
    // ID is a combination of:
    //   - Prefix - description of what kind of Card this is
    //   - Datetime - ISO Datetime when Card is created
    //   - Random Suffix - to differentiate cards created in the same millisecond
    this._id = idPrefix
      + "-"
      + new Date().toISOString()
      + "-"
      + Math.random().toString(36).substring(2,6);
    this.updateGlobal();
  }

  // Accessors
  public get id(): string      { return this._id; }
  public set id(newId: string) {
    log.warn("Card already has id: " + this.id);
  }

  public get name()                { return this._name; }
  public set name(newName: string) {
    this._name = newName;
    this.updateGlobal();
  }

  public get description()                { return this._description; }
  public set description(newDesc: string) {
    this._description = newDesc;
    this.updateGlobal();
  }

  // textString is stringified version of textJSON
  // The idea here is to translate between EditorJS data structure and plain strings
  // ... this is probably making it too complicated
  public get textString(): string        { return JSON.stringify(this.text); }
  public set textString(newText: string) { this.text = JSON.parse(newText); }

  // text is JSON from Text Editor
  public get text(): any { return this._text; }
  public set text(newTextData: any) {
    this._text = newTextData;
    this.updateGlobal();
  }

  public get attributes(): any                { return this._attributes; }
  public set attributes(cardAttributes: any)  {
    this._attributes = cardAttributes;
    this.updateGlobal();
  }

  public AddAttribute(newAttributeName: string, newAttributeValue: any) {
    this._attributes[newAttributeName] =  newAttributeValue;
    this.updateGlobal();
  }
  public RemoveAttribute(attributeName: string) {
    log.info(`Removing attribute: ${attributeName}`);
    this.updateGlobal();
  }

  protected abstract updateGlobal(): void;

}

export default BaseCard;
