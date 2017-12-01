import {Model} from 'ringa';

import {setCookie, getCookie} from 'ringa-fw-react';

export default class SpotifyModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('token', undefined, {
      set: value => {
        this._token = value;

        if (value) {
          setCookie('spotify_token', JSON.stringify(value));
        }
      }
    });
    this.addProperty('profile');
    this.addProperty('playlists');
    this.addProperty('player');
    this.addProperty('music');
    this.addProperty('curPlaylistID');
    this.addProperty('scopes', 'user-modify-playback-state user-read-playback-state');

    try {
      let spotify_token = JSON.parse(getCookie('spotify_token'));

      if (spotify_token) {
        this.token = spotify_token;
      }
    } catch(e) {

    }
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