import {Controller, event} from 'ringa';

import SpotifyModel from '../models/SpotifyModel';
import RestController from './RestController';

export const SPOTIFY_LOGIN_REJECTED = 0x01;

export default class SpotifyController extends Controller {
  constructor(props) {
    super(props, undefined, {});

    this.addModel(new SpotifyModel());

    let handle401Redirect = ($lastPromiseError, fail) => {
      if ($lastPromiseError && $lastPromiseError.status === 401) {
        window.location.href = '/';
      } else if ($lastPromiseError) {
        fail($lastPromiseError, true);
      }
    };

    /**
     * Get the user profile.
     */
    this.addListener('getUserProfile', [event(RestController.GET, spotifyModel => ({
        url: `${SPOTIFY_API}/me`,
        headers: spotifyModel.headers
      })),
      handle401Redirect,
      (spotifyModel, $lastPromiseResult) => {
        spotifyModel.profile = $lastPromiseResult;
      }]);

    /**
     * Get the users playlists
     */
    this.addListener('getPlaylists', [event(RestController.GET, spotifyModel => ({
      url: `${SPOTIFY_API}/me/playlists`,
      headers: spotifyModel.headers
    })),
      handle401Redirect,
      (spotifyModel, $lastPromiseResult) => {
        spotifyModel.playlists = $lastPromiseResult.items;
      }]);

    /**
     * Get the users playlists music
     */
    this.addListener('getPlaylistMusic', [event(RestController.GET, (spotifyModel, playlistId) => ({
        url: `${SPOTIFY_API}/users/${spotifyModel.profile.id}/playlists/${playlistId}/tracks`,
        headers: spotifyModel.headers
      })),
      handle401Redirect,
      (spotifyModel, $lastPromiseResult) => {
        spotifyModel.music = $lastPromiseResult.items;
      }]);

    /**
     * Get the users playlists music
     */
    this.addListener('play', event(RestController.PUT, spotifyModel => ({
        url: `${SPOTIFY_API}/me/player/play`,
        headers: spotifyModel.headers,
        bodyParam: 'tracks'
      })));

    /**
     * Start the client-only login process.
     */
    this.addListener('triggerClientSpotifyLogin', [($detail, spotifyModel) => {
        let redirect_uri = `http://${window.location.hostname}:8080/spotify`;
        let url = $detail.url = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(spotifyModel.scopes)}`;

        window.location.href = url;
      }]);

    /**
     * Decode the callback redirect_uri
     */
    this.addListener('decodeSpotifyRedirect', [(spotifyModel, fail) => {
        let href = window.location.href;
        let ix = href.indexOf('access_token=');

        if (ix !== -1) {
          let tokenSubPart = href.substr(ix + 13);
          let length = tokenSubPart.indexOf('&');

          spotifyModel.token = tokenSubPart.substr(0, length);
        } else {
          fail(SPOTIFY_LOGIN_REJECTED, true);
        }
      },
      SpotifyController.GET_USER_PROFILE
    ]);
  }
}