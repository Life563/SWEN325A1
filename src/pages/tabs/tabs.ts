import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

/**
 * The class for the tabs
 */
export class TabsPage {

  @ViewChild('tabIndex') tabsRef: Tabs;
  // Tabs
	tab1: any = 'DashboardPage';
  tab2: any = 'NotesPage';
  tab3: any = 'ToDoPage';
	tab4: any = 'RemindersPage';  

  constructor(public navCrtl: NavController, public navParams: NavParams) { }

  /**
   * Gets the tab that the user selected and loads that page
   */
  ionViewDidLoad() {    
    let openTab = this.navParams.get('openTab');
    if(openTab){
      this.tabsRef.select(openTab);
    }
  }

}
