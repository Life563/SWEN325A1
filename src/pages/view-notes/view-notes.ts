import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-view-notes',
  templateUrl: 'view-notes.html',
})

/**
 * Class to view the note
 */
export class ViewNotesPage {

  title;
  description;

  originalNote;

  constructor(public navParams: NavParams, public view: ViewController) { }

    /**
     * Called when user clicks save. Creates a note data structure and passes it through to be saved, then closes page
     */
    saveNote(){
      let editedNote = {
        id: this.originalNote.id,
        title: this.title,
        description: this.description
      }; 
      this.view.dismiss(editedNote)
    }

  /**
   * Closes window without saving the edited note
   */
  close(){
    this.view.dismiss()
  }

  /**
   * Gets the information for the note
   */
  ionViewDidLoad() {
    this.originalNote = this.navParams.get('note');
    this.title = this.originalNote.title;
    this.description = this.originalNote.description;
  }

}
