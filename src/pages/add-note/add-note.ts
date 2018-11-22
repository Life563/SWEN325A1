import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})

/**
 * Class used when the user is creating a note
 */
export class AddNotePage {  

  title: string;
  description: string;

  constructor(public navCtrl: NavController, public view: ViewController) { }

  /**
   * Called when user clicks save. Creates a note data structure and passes it through to be saved, then closes page
   */
  saveNote(){
    let newNote = {
      id: "",
      title: this.title,
      description: this.description
    }; 
    this.view.dismiss(newNote)
  }

  /**
   * Closes window without saving the note
   */
  close(){
    this.view.dismiss()
  }

}
