import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-to-do',
  templateUrl: 'add-to-do.html',
})

/**
 * This is where we add To-Dos.
 */
export class AddToDoPage {

  title: string;
  items: any[] = [];

  item: any;

  constructor(public navCtrl: NavController, public view: ViewController) {}

  /**
   * Creates a To-Do data structure, then passes the reminder through to be saved. Then dismisses the window
   */
  saveToDo(){
    // Creates a To-Do
    let newToDo = {
      id: "",
      title: this.title,
      items: this.items
    }; 
    this.view.dismiss(newToDo);
  }

  /**
   * Adds an item to the current list
   */
  pushToDo(){
    this.items.push(this.item);
  }

  /**
   * 
   * Deletes item from list
   * 
   * @param item - Item to be deleted
   */
  deleteItem(item){
    for(var i = 0; i < this.items.length; i++){
      if(this.items[i].toString() == item.toString()){
        this.items.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Closes the window without saving anything
   */
  close(){
    this.view.dismiss();
  }

}
