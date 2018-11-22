import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

/**
 * Class for functions related to any settings
 */
export class SettingsPage {

  selectedTheme: String;

  /**
   * Sets the theme
   */
  constructor(public navCtrl: NavController, public settings: SettingsProvider) {
    this.settings.getTheme().subscribe(val => this.selectedTheme = val);
  }

  /**
   * Changes theme depending on what the current theme is
   */
  changeTheme(){
    if(this.selectedTheme == "dark-theme"){ // Chanage to light
      this.settings.setActiveTheme("light-theme");
    }else{  // Chanage to dark
      this.settings.setActiveTheme("dark-theme");
    }
  }

}
