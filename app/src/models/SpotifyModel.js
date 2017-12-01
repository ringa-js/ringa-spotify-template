import {Model} from 'ringa';

export default class SpotifyModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('token');
    this.addProperty('profile');
    this.addProperty('playlists');
    this.addProperty('scopes', 'user-modify-playback-state');
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get headers() {
    return {
      Authorization: 'Bearer ' + this.token
    };
  }
}