import { Component } from '@angular/core';
import { NavController, NavParams, reorderArray, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-view-to-do',
  templateUrl: 'view-to-do.html',
})

/**
 * Class used to view To-Dos
 */
export class ViewToDoPage {

  title;
  items: string[];
  item: string;

  originalTodo;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {}


    /**
     * Called when user clicks save. Creates a note data structure and passes it through to be saved, then closes page
     */
    saveToDo(){
      let editedNote = {
        id: this.originalTodo.id,
        title: this.title,
        items: this.items
      }; 
      this.view.dismiss(editedNote)
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
   * Method which use Ionics reorderArray function to dynamically change the items in the list
   * 
   * @param indexes - the changing indicies
   */
  reorderItems(indexes){
    this.items = reorderArray(this.items, indexes); // Ionic Method
  }

    /**
   * Closes window without saving the edited todo
   */
  close(){
    this.view.dismiss()
  }

  /**
   * Loads the information about the To-Do list
   */
  ionViewDidLoad() {
    this.originalTodo = this.navParams.get('todo');
    this.title = this.originalTodo.title;
    this.items = this.originalTodo.items;
  }

}
