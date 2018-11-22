import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, Platform } from 'ionic-angular';
import { AddReminderPage } from '../add-reminder/add-reminder';
import { ViewRemindersPage } from '../view-reminders/view-reminders';
import { Data } from '../../providers/data/data';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { firebaseReminders } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
})
/**
 * Main class for reminders
 */
export class RemindersPage {

  public fireReminders: AngularFireList<any[]>;
  public recentReminders = [];
  public allReminders = [];

   /**
   * Loads in the reminders
   */
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, private localNotifications: LocalNotifications, public fireData: AngularFireDatabase) {
     // Retrieve firebase storage
     this.fireReminders = fireData.list('/fireReminders');
        // Load in local recent reminders
        this.dataService.getRecentReminders().then((reminder) => {
          if(reminder){
            this.recentReminders = reminder;
          }
        })
        // Load in reminders
        this.allReminders = [];
        var loadedReminders = firebaseReminders;
        loadedReminders.forEach(element => {
          this.allReminders.push(element);
        });     
   }

   /**
   * Brings up the page to add a reminder
   */
  addReminder(){
    let addReminder = this.modalCtrl.create(AddReminderPage);
    addReminder.onDidDismiss((reminder) => {
      if(reminder){
        this.saveReminder(reminder);
      }
    });
    addReminder.present();
  }

  /**
   * Saves the reminder
   */
  saveReminder(reminder){
    // Get an Id from firebase
    const reminderRef = this.fireReminders.push(reminder); // Dummy Push, done to get ID, fill in info next
    reminder.id = reminderRef.key; // Give it a key
    reminderRef.set({
      id: reminderRef.key,
      reminder: reminder
    });
    // Push to device storage as well, just in case
    this.allReminders.push(reminder);
    if(this.recentReminders.length >= 3){ // Pop off a reminder
      this.recentReminders.reverse().pop();
      this.recentReminders.reverse();
    }
    this.recentReminders.push(reminder);
    this.dataService.saveReminders(this.allReminders);
    this.dataService.saveRecentReminders(this.recentReminders);
  }

  /**
   * Deletes a reminder from the 
   * 
   * @param reminder - reminder to be deleted
   */
  deleteReminder(reminder){
    // Remove from all notes
    for(var i = 0; i < this.allReminders.length; i++){
      if(reminder.id == this.allReminders[i].id){ // remove
        this.allReminders.splice(i, 1);
      }
    }
    // Remove from recent notes
    for(var i = 0; i < this.recentReminders.length; i++){
      if(reminder.id == this.recentReminders[i].id){ // remove
        this.recentReminders.splice(i, 1);
      }
    }
    // Update data provider with new arrays
    this.dataService.saveNotes(this.allReminders);
    this.dataService.saveRecentNotes(this.recentReminders);
    // Remove from firebase
    this.fireReminders.remove(reminder.id);
  }

  /**
   * Brings up the view page for a reminder
   */
  viewReminders(reminder){
    let viewReminder = this.modalCtrl.create(ViewRemindersPage, {reminder: reminder});
    viewReminder.onDidDismiss((reminder) => {
      if(reminder != null){
        // Update references, do local first
        for(var i = 0; i < this.allReminders.length; i++){
          if(reminder.id == this.allReminders[i].id){ // Update
            this.allReminders[i].reminder.title = reminder.reminder.title;
            this.allReminders[i].reminder.description = reminder.reminder.description;
            this.allReminders[i].reminder.data = reminder.reminder.data;
            break;
          }
        }
        for(var i = 0; i < this.recentReminders.length; i++){
          if(reminder.id == this.recentReminders[i].id){ // Update
            this.recentReminders[i].reminder.title = reminder.reminder.title;
            this.recentReminders[i].reminder.description = reminder.reminder.description;
            this.recentReminders[i].reminder.data = reminder.reminder.data;
            break;
          }
        }
        // Update Firebase
        this.fireData.database.ref('/fireReminders/' + reminder.id).set({
          id: reminder.id,
          reminder: reminder
        });
      }
    });
    viewReminder.present();
  }

}
