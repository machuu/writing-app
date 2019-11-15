export interface IAttribute {
  name: string;
  value: any;
}

export class BaseCard {
  private _attributes: IAttribute[] = []; // array of Card Attributes
  private _id: string; // unique ID
  private _description: string = ""; // Descriptive Name
  private _name: string = ""; // Descriptive Name
  private _text: any = {};   // Text Editor Content: JSON

  // Constructor
  constructor(idPrefix: string = "CARD") {
    // ID is a combination of:
    //   - Prefix - description of what kind of Card this is
    //   - Datetime - ISO Datetime when Card is created
    //   - Random Suffix - to differentiate cards created in the same millisecond
    this._id = idPrefix
      + "-"
      + new Date().toISOString()
      + "_"
      + Math.random().toString(36).substring(2,6);
    this.updateGlobal();
  }

  // Accessors
  public get id(): string      { return this._id; }
  public set id(newId: string) {
    console.log("Card already has id: " + this.id);
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
  public get textString(): string        { return JSON.stringify(this.textJSON); }
  public set textString(newText: string) { this.textJSON = JSON.parse(newText); }

  public get attributes(): ICardAttribute[]                { return this._attributes; }
  public set attributes(cardAttributes: ICardAttribute[])  {
    this._attributes = cardAttributes;
    this.updateGlobal();
  }

  public AddAttribute(newAttribute: ICardAttribute) {
    this._attributes.push( newAttribute );
    this.updateGlobal();
  }
  public RemoveAttribute(attributeName: string) {
    console.log(`Removing attribute: ${attributeName}`);
    this.updateGlobal();
  }

  private updateGlobal(): void {
    // Nothing happens on base class
  }

}

export default BaseCard;
