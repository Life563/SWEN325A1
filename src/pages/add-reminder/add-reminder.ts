import { Component } from '@angular/core';
import { ViewController, NavController, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

// Used the Moment.js libraby from https://momentjs.com/

@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html',
})

/**
 * Class used to add a reminder for the user. Uses the moment.js library as it makes it a lot easier to work with ISO date/time formats in javascript
 */
export class AddReminderPage {

  title: string;
  description: string;
  data: any[];

  notificationTime: any;
  // Time
  chosenTime: any;  
  hours: number;
  minutes: number;
  // Day
  day: number;
  month: number;
  year: number;

  constructor(public navCtrl: NavController, public view: ViewController, public alertCtrl: AlertController, public platform: Platform, public localNotifications: LocalNotifications) {
    this.chosenTime = moment(new Date()).format();
    this.hours = new Date().getHours();
    this.minutes = new Date().getMinutes();
  }

  /**
   * Sets the time of the notification to go off
   * 
   * @param time - time to be set
   */
  setTime(time){
    this.hours = time.hour;
    this.minutes = time.minute;
  }

  /**
   * Sets the day that the notification will go off
   * 
   * @param day - day notification will go off
   */
  setDay(day){
    this.day = day.day;
    this.month = day.month;
    this.year = day.year;
  }

  /**
   * Creates a notification from the time and date variables, then passes the reminder through to be saved
   */
  saveReminder(){
    this.data = [this.day, this.month, this.year, this.minutes, this.hours];
    // Make a new date and modify it
    this.notificationTime = new Date(this.year, this.month, this.day, this.hours, this.minutes);
    // Create the notification
    let reminder = {      
      title: this.title,
      description: this.description,
      data: this.data,
      trigger: {at: this.notificationTime}
    };
    // Create the reminder holder
    let newReminder = {
      id: "",
      reminder
    };
    
    this.localNotifications.schedule(reminder);
    this.view.dismiss(newReminder)
  }

  /**
   * Closes the window without saving the reminder
   */
  close(){
    this.view.dismiss()
  }

  /**
   * Different that the other ionViewDidLoad methods, as we want to ask the user for permissions if actually deployed, so we might as well
   * check when the page is loaded.
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddReminderPage');
    if(this.platform.is('cordova')){ // Needed to not throw error in ionic labs
      this.localNotifications.hasPermission().then(function(granted) {
        if (!granted) {
          this.localNotifications.registerPermission();
        }
        });
    }   
  }
}
