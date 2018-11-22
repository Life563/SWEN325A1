import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { AddToDoPage } from '../add-to-do/add-to-do';
import { ViewToDoPage } from '../view-to-do/view-to-do';
import { Data } from '../../providers/data/data';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { firebaseTodos } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-to-do',
  templateUrl: 'to-do.html',
})

/**
 * The class used when creating To-Do lists
 */
export class ToDoPage {

  public fireTodos: AngularFireList<any[]>; // Reference
  public recentToDos = [];
  public allToDos = [];

  /**
   * Loads in all the To-Do lists
   */
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, public fireData: AngularFireDatabase) {
    // Retrieve firebase storage
    this.fireTodos = fireData.list('/fireTodos');
    // Load in the saved data
    // Load in local recent todos
    this.dataService.getRecentToDos().then((todos) => {
      if(todos){
        this.recentToDos = todos;
      }
    })
    // Load in todos
    this.allToDos = [];
    var loadedTodos = firebaseTodos;
    loadedTodos.forEach(element => {
      this.allToDos.push(element);
    }); 
  }

  /**
   * Creates the AddToDoPage, then gets the To-Do from that page and passes it through to be saved
   */
  addToDo(){
    let addToDo = this.modalCtrl.create(AddToDoPage);
    addToDo.onDidDismiss((todo) => {
      if(todo){
        this.saveToDo(todo);
      }
    });
    addToDo.present();
  }

  /**
   * Saves the passed through To-Do to local storage and firebase
   * 
   * @param todo - To-Do to be saved
   */
  saveToDo(todo){
     // Get an Id from firebase
     const todoRef = this.fireTodos.push(todo); // Dummy Push, done to get ID, fill in info next
     todo.id = todoRef.key;
     todoRef.set({
       id: todoRef.key,
       todo: todo
     });
     // Push to device storage as well, just in case
    this.allToDos.push(todo);
    if(this.recentToDos.length >= 3){ // Pop off a reminder
      this.recentToDos.reverse().pop();
      this.recentToDos.reverse();
    }
    this.recentToDos.push(todo);
    // Update data provider
    this.dataService.saveToDos(this.allToDos);
    this.dataService.saveRecentToDos(this.recentToDos);
  }

  /**
   * Deletes a To-Do from all lists and databases
   * 
   * @param todo - The To-Do to delete
   */
  deleteToDo(todo){
    // Remove from all notes
    for(var i = 0; i < this.allToDos.length; i++){
      if(todo.id == this.allToDos[i].id){ // remove
        this.allToDos.splice(i, 1);
      }
    }
    // Remove from recent notes
    for(var i = 0; i < this.recentToDos.length; i++){
      if(todo.id == this.recentToDos[i].id){ // remove
        this.recentToDos.splice(i, 1);
      }
    }
    // Update data provider with new arrays
    this.dataService.saveToDos(this.allToDos);
    this.dataService.saveRecentToDos(this.recentToDos);
    // Remove from firebase
    this.fireTodos.remove(todo.id);
  }

  /**
   * Opens up the todo to be viewed in full, as well as allows for editing of the todo
   * 
   * @param todo - the To-Do to view
   */
  viewToDo(todo){
    let viewToDo = this.modalCtrl.create(ViewToDoPage, {todo: todo});
    viewToDo.onDidDismiss((todo) => {
      if(todo != null){
        // Update references
        for(var i = 0; i < this.allToDos.length; i++){
          if(todo.id == this.allToDos[i].id){ // Update
            this.allToDos[i].title = todo.title;
            this.allToDos[i].description = todo.items;
            break;
          }
        }
        // Recent Notes
        for(var i = 0; i < this.recentToDos.length; i++){
          if(todo.id == this.recentToDos[i].id){ // Update
            this.recentToDos[i].title = todo.title;
            this.recentToDos[i].description = todo.items;
            break;
          }
        }
        // Update Firebase
        this.fireData.database.ref('/fireTodos/' + todo.id).set({
          id: todo.id,
          todo: todo
        });
      }
    });
    viewToDo.present();
  }

}
