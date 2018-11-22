import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

// Used the Moment.js libraby from https://momentjs.com/

@Component({
  selector: 'page-view-reminders',
  templateUrl: 'view-reminders.html',
})

/**
 * Class to view and edit the reminders
 */
export class ViewRemindersPage {

  title;
  description;
  data: any[];

  notificationTime;

  chosenDate: any;  

  originalReminder;

  /**
   * Loads the information about the reminder
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public localNotifications: LocalNotifications) {
    this.originalReminder = this.navParams.get('reminder');
    this.title = this.originalReminder.reminder.title;
    this.description = this.originalReminder.reminder.description;
    this.data = this.originalReminder.reminder.data;  

    this.chosenDate = moment(new Date(this.data[2], this.data[1], this.data[0], this.data[4], this.data[3])).format();
  }

    /**
   * Sets the time of the notification to go off
   * 
   * @param time - time to be set
   */
  setTime(time){
    this.data[3] = time.minute;
    this.data[4] = time.hour;
  }

  /**
   * Sets the day that the notification will go off
   * 
   * @param day - day notification will go off
   */
  setDay(day){
    this.data[0] = day.day;
    this.data[1] = day.month;
    this.data[2] = day.year;
  }

  /**
   * Creates a notification from the time and date variables, then passes the reminder through to be saved
   */
  saveReminder(){
    // Make a new date and modify it
    this.notificationTime = new Date(this.data[2], this.data[1], this.data[0], this.data[4], this.data[3]);
    // Create the notification
    let newNotification = {      
      title: this.title,
      description: this.description,
      data: this.data,
      trigger: {at: this.notificationTime}
    };

    let reminder ={
      id: this.originalReminder.id,
      reminder: newNotification
    }
    // Cancel old notification
    this.localNotifications.cancel(this.originalReminder.reminder);
    this.localNotifications.schedule(newNotification);
    this.view.dismiss(reminder)
  }

  /**
   * Closes the window without saving the reminder
   */
  close(){
    this.view.dismiss()
  }

}
