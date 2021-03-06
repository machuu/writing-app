// Navigation Helpers
//
//
import loglevel from "loglevel";

const logGlobal = loglevel.getLogger("Global");
const log = loglevel.getLogger("NavMenu");
log.setDefaultLevel(logGlobal.getLevel());

class NavMenu {

  public  _closed_width: string  = "10px";
  public  _closed_height: string = "100%";
  public  _opened_width: string  = "200px";
  public  _opened_height: string = "100%";

  private _element: HTMLElement;
  private _open_button: HTMLElement;
  private _close_button: HTMLElement;
  private _toggle_button: HTMLElement;

  private _is_open: boolean = false;

  constructor(id: string) {
    log.info(`Constructing new NavMenu on element id: ${id}`);
    this._element = document.getElementById(id);

    // Start with closed styling
    this.close();

    // Try initializing NavMenu buttons, if the elements exist
    this.set_open_button(`${id}-button-open`);
    this.set_close_button(`${id}-button-close`);
    this.set_toggle_button(`${id}-button-toggle`);
  }

  public get element(): HTMLElement { return this._element; }
  public set element(newElement: HTMLElement) { this._element = newElement; }
  public get id(): string {
    return this.element.id;
  }

  public get close_button(): HTMLElement { return this._close_button; }
  public set close_button(newElement: HTMLElement) { this._close_button = newElement; }

  public get open_button(): HTMLElement { return this._open_button; }
  public set open_button(newElement: HTMLElement) { this._open_button = newElement; }

  public get toggle_button(): HTMLElement { return this._toggle_button; }
  public set toggle_button(newElement: HTMLElement) { this._toggle_button = newElement; }

  // TODO: Consolidate close/open/toggle buttons
  // make buttons a list, so multiple buttons can exist for the same instance
  // Something like:
  // this.add_button( close/open/toggle, button_id)
  // this.remove_button( button_id)
  public set_close_button(button_id: string): void {
    // Assign this Nav's close button, if it exists
    if ( document.getElementById(button_id) ) {
      log.info(`Adding close button '${button_id}' to NavMenu '${this.id}'`);
      this._close_button = <HTMLElement> document.getElementById(button_id);

      // Add new event listener
      this._close_button.addEventListener("click", () => { this.close(); } );
    }
  }

  public set_open_button(button_id: string) {
    // Assign this Nav's open button, if it exists
    if ( document.getElementById(button_id) ) {
      log.info(`Adding open button '${button_id}' to NavMenu '${this.id}'`);
      this._open_button = document.getElementById(button_id);

      // Add new event listener
      this._open_button.addEventListener("click", () => { this.open(); } );
    }
  }

  public set_toggle_button(button_id: string) {
    // Assign this Nav's toggle button, if it exists
    if ( document.getElementById(button_id) ) {
      log.info(`Adding toggle button '${button_id}' to NavMenu '${this.id}'`);
      this._toggle_button = document.getElementById(button_id);

      // Add new event listener
      this._toggle_button.addEventListener("click", () => { this.toggle(); } );
    }
  }

  public set closed_height(css_size: string) {
    this._closed_height = css_size;
    if ( this.is_closed() ) {
      this.set_height( this.closed_height );
    }
  }

  public get closed_height(): string {
    return this._closed_height;
  }

  public set closed_width(css_size: string) {
    this._closed_width = css_size;
    if ( this.is_closed() ) {
      this.set_width( this.closed_width );
    }
  }

  public get closed_width(): string {
    return this._closed_width;
  }

  public set opened_height(css_size: string) {
    this._opened_height = css_size;
    if ( this.is_open() ) {
      this.set_height( this.opened_height );
    }
  }

  public get opened_height(): string {
    return this._opened_height;
  }

  public set opened_width(css_size: string) {
    this._opened_width = css_size;
    if ( this.is_open() ) {
      this.set_width( this.opened_width );
    }
  }

  public get opened_width(): string {
    return this._opened_width;
  }

  public is_open(): boolean {
    return this._is_open;
  }

  public is_closed(): boolean {
    return !this._is_open;
  }

  public close() {
    log.info(`Closing ${this.element.id}`);
    this.set_width(  this.closed_width  );
    this.set_height( this.closed_height );
    this.hide_scrollbar();
    this._is_open = false;
  }

  public open() {
    log.info(`Opening ${this.element.id}`);
    this.set_width(  this.opened_width  );
    this.set_height( this.opened_height );
    this.show_scrollbar();
    this._is_open = true;
  }

  public toggle() {
    log.info(`Toggling ${this.element.id}`);
    if ( this.is_open() ) {
      this.close();
    } else {
      this.open();
    }
  }

  private set_height(css_size: string) {
    log.trace(`Set ${this.element.id} height to ${css_size}`);
    this.element.style.height = css_size;
  }

  private set_width(css_size: string) {
    log.trace(`Set ${this.element.id} width to ${css_size}`);
    this.element.style.width = css_size;
  }

  private hide_scrollbar() {
    this.element.style.overflow = "hidden";
  }

  private show_scrollbar() {
    this.element.style.overflow = "scroll";
  }

}

export default NavMenu;
