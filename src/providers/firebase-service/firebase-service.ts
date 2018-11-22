import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

@Injectable()
export class FirebaseServiceProvider {

  constructor(public afd: AngularFireDatabase) { }
  
}
