import {Controller} from 'ringa';

import AppModel from '../models/AppModel';

export default class AppController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super('AppController');

    this.addModel(new AppModel());
  }
}
