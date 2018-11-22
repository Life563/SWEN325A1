import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
/**
 * Methods related to data storage
 */
export class Data {

  constructor(public storage: Storage) { }

  // Notes

  getNotes(){
    return this.storage.get('notes');
  }

  saveNotes(data){
    this.storage.set('notes', data);
  }

  getRecentNotes(){
    return this.storage.get('recentNotes');
  }

  saveRecentNotes(data){
    this.storage.set('recentNotes', data);
  }

  // Reminders
  
  getReminders(){
    return this.storage.get('reminders');
  }

  saveReminders(data){
    this.storage.set('reminders', data);
  }

  getRecentReminders(){
    return this.storage.get('recentReminders');
  }

  saveRecentReminders(data){
    this.storage.set('recentReminders', data);
  }

  // Todos

  getToDos(){
    return this.storage.get('todos');
  }

  saveToDos(data){
    this.storage.set('todos', data);
  }

  getRecentToDos(){
    return this.storage.get('recentTodos');
  }

  saveRecentToDos(data){
    this.storage.set('recentTodos', data);
  }

}
