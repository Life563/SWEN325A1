import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

/**
 * The class for the login page. Gets the username then changes the root page
 */
export class LoginPage {
  
  public username: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: Data, public fireData: AngularFireDatabase) { }
  
  /**
   * Sets the username and then sets the new root page, that being the daskhobard
   */
  doLogin(){
    globalUsername = this.username;
    // Load in the notes
    var loadedNotes = [];
    var notesRef = this.fireData.database.ref('/fireNotes');
    notesRef.orderByKey().on("child_added", function(snapshot) { // Get each child
      var Note = snapshot.val();
      var loadedNote = Note.note;
      if(loadedNote != null){
        console.log('pushed note');
        loadedNotes.push(loadedNote);     
      }          
    });
    // Load in the To-dos
    var loadedTodos = [];
    var todosRef = this.fireData.database.ref('/fireTodos');
    todosRef.orderByKey().on("child_added", function(snapshot) { // Get each child
      var Todo = snapshot.val();
      var loadedTodo = Todo.todo;
      if(loadedTodo != null){
        console.log('pushed todo');
        loadedTodos.push(loadedTodo);     
      }          
    });
    // Load in the reminders
    var loadedReminders = [];
    var remindersRef = this.fireData.database.ref('/fireReminders');
    remindersRef.orderByKey().on("child_added", function(snapshot) { // Get each child
      var Reminder = snapshot.val();
      var loadedReminder = Reminder.reminder;
      if(loadedReminder != null){
        console.log('pushed reminder');
        loadedReminders.push(loadedReminder);     
      }          
    });
    this.navCtrl.setRoot('MenuPage');
    firebaseNotes = loadedNotes;
    firebaseTodos = loadedTodos;
    firebaseReminders = loadedReminders;
  }
}

// Name of the current user
export let globalUsername : string;
export let firebaseNotes : any[];
export let firebaseTodos : any[];
export let firebaseReminders : any[];
