import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { AddNotePage } from '../add-note/add-note';
import { ViewNotesPage } from '../view-notes/view-notes';
import { Data } from '../../providers/data/data';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { firebaseNotes } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})

/**
 * The class for the notes page
 */
export class NotesPage {

  public fireNotes: AngularFireList<any[]>;
  public recentNotes = [];
  public allNotes = [];

  /**
   * Loads in the notes
   */
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, public fireData: AngularFireDatabase) {       
    // Retrieve firebase storage
    this.fireNotes = fireData.list('/fireNotes');  
    // Recent local notes
    this.dataService.getRecentNotes().then((notes) => {
      if(notes){
        this.recentNotes = notes;
      }
    });  
    // Load in notes
    this.allNotes = [];
    var loadedNotes = firebaseNotes;
    loadedNotes.forEach(element => {
      this.allNotes.push(element);
    });  
  }

  /**
   * Creates the AddNotePage window, then gets the note that was passed through from the AddNotePage so that it can be passed through 
   * and saved later
   */
  addNotes(){
    let addNote = this.modalCtrl.create(AddNotePage);
    addNote.onDidDismiss((note) => {
      if(note){
        this.saveNote(note);
      }
    });
    addNote.present();
  }

  /**
   * Saves the note to firebase as well as the local storage
   * 
   * @param note - the note to be saved
   */
  saveNote(note){
    // Get an Id from firebase
    const noteRef = this.fireNotes.push(note); // Dummy Push, done to get ID
    note.id = noteRef.key;
    noteRef.set({
      id: noteRef.key,
      note: note
    });
    // Push to device storage as well, just in case
    this.allNotes.push(note);
    if(this.recentNotes.length >= 3){ // Pop off a note
      this.recentNotes.reverse().pop();
      this.recentNotes.reverse();
    }
    this.recentNotes.push(note);
    this.dataService.saveNotes(this.allNotes);
    this.dataService.saveRecentNotes(this.recentNotes);
  }

  /**
   * Passes through a note to be deleted. First removes it from the local storage, then updates firebase
   * 
   * @param note Note to be deleted
   */
  deleteNote(note){
    // Remove from all notes
    for(var i = 0; i < this.allNotes.length; i++){
      if(note.id == this.allNotes[i].id){ // remove
        this.allNotes.splice(i, 1);
        break;
      }
    }
    // Remove from recent notes
    for(var i = 0; i < this.recentNotes.length; i++){
      if(note.id == this.recentNotes[i].id){ // remove
        this.recentNotes.splice(i, 1);
        break;
      }
    }
    // Update data provider with new arrays
    this.dataService.saveNotes(this.allNotes);
    this.dataService.saveRecentNotes(this.recentNotes);
    // Remove from firebase
    this.fireNotes.remove(note.id);
  }

  /**
   * Passes through the note to be viewed in the ViewNotesPage and updates the note if need be
   * 
   * @param note - Note to be viewed and potentially edited
   */
  viewNotes(note){
    let viewNote = this.modalCtrl.create(ViewNotesPage, {note: note});
    viewNote.onDidDismiss((note) => {
      if(note != null){
        // Update references
        for(var i = 0; i < this.allNotes.length; i++){
          if(note.id == this.allNotes[i].id){ // Update
            this.allNotes[i].title = note.title;
            this.allNotes[i].description = note.description;
            break;
          }
        }
        // Recent Notes
        for(var i = 0; i < this.recentNotes.length; i++){
          if(note.id == this.recentNotes[i].id){ // Update
            this.recentNotes[i].title = note.title;
            this.recentNotes[i].description = note.description;
            break;
          }
        }
        // Update Firebase
        this.fireData.database.ref('/fireNotes/' + note.id).set({
          id: note.id,
          note: note
        });
      }
    });
    viewNote.present();
  }

}