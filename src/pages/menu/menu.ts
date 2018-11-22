import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

/**
 * Class for the side menu
 */
export class MenuPage {
	//Reference to navigation
  rootPage = 'TabsPage'

  @ViewChild(Nav) nav: Nav;  
  pages: Array<{title: string, component: string, openTab?: any}>;
  
  /**
   * Creates the pages for navigation in the side menu
   */
  constructor(public navCtrl: NavController) {
    this.pages = [
      {title: 'Dashboard', component: 'TabsPage', openTab: 0},
      {title: 'Settings', component: 'SettingsPage'},
      {title: 'About', component: 'AboutPage'},
    ];
  } 
  
  /**
   * Opens the page passed through
   * @param page - the page to move to
   */
  openPage(page){
    this.nav.setRoot(page.component, { openTab: page.openTab}); 
  }

}
