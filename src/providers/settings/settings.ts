import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
/**
 * Creates the different methods used in settings
 */
export class SettingsProvider {

  private theme: BehaviorSubject<String>;

  /**
   * App by default loads in the light theme
   */
  constructor() {
    this.theme = new BehaviorSubject('light-theme')
  }

  /**
   * Changes the theme to the passed through theme
   * 
   * @param theme - theme to be set
   */
  setActiveTheme(theme){
    this.theme.next(theme);
  }

  /**
   * Gets the current theme
   */
  getTheme(){
    return this.theme.asObservable();
  }

}
