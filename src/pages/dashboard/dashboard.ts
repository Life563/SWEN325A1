import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { globalUsername } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

/**
 * The class for the main dashboard page.
 */
export class DashboardPage {

  public username: string = "";
  public recentNotes = [];
  public recentToDos = [];
  public recentReminders = [];

  /**
   * Loads the most recent notes, todos, and reminders
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, private toastCtrl: ToastController) {
    // Notes
    this.dataService.getRecentNotes().then((notes) => {
      if(notes){
        this.recentNotes = notes;
      }
    })
    // Todos
    this.dataService.getRecentToDos().then((todos) => {
      if(todos){
        this.recentToDos = todos;
      }
    })
    // Reminders
    this.dataService.getRecentReminders().then((reminders) => {
      if(reminders){
        this.recentReminders = reminders;
      }
    })
  } 

  /**
   * Creates the toast message to welcome the user
   */
  ionViewDidLoad() {
    this.username = globalUsername;
    let toast = this.toastCtrl.create({
      message: 'Hello ' + this.username,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
