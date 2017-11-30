import {Controller} from 'ringa';
import {event} from 'react-ringa';

import SpotifyModel from '../models/SpotifyModel';
import RestController from './RestController';

export default class SpotifyController extends Controller {
  constructor(props) {
    super(props);

    this.addModel(new SpotifyModel());

    this.addListener('triggerClientSpotifyLogin', [$detail => {
        let redirect_uri = `http://${window.location.hostname}:8080/spotify`;

        $detail.url = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(redirect_uri)}`;

        console.log('Redirecting to', $detail.url);
      }, 5000, url => {
        window.location.href = url;
      }]);

    this.addListener('decodeSpotifyRedirect', spotifyModel => {
      let ix = window.location.href.indexOf('access_token=');

      let tokenSubPart = window.location.href.substr(ix + 13);
      let length = tokenSubPart.indexOf('&');

      spotifyModel.token = tokenSubPart.substr(0, length);
    })
  }
}