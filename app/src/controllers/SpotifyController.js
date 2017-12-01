import {Controller, event} from 'ringa';

import SpotifyModel from '../models/SpotifyModel';
import RestController from './RestController';

export const SPOTIFY_LOGIN_REJECTED = 0x01;

export default class SpotifyController extends Controller {
  constructor(name, history) {
    super(name, undefined, {});

    this.history = history;

    this.spotifyModel = this.addModel(new SpotifyModel());

    /**
     * Anytime a property changes we refresh the player state.
     */
    this.spotifyModel.watch((...args) => {
      if (args[0] === 'player') return;

      this.dispatch(SpotifyController.GET_PLAYER);
    });

    setInterval(() => {
      this.dispatch(SpotifyController.GET_PLAYER);
    }, 1000);

    let handle401Redirect = ($lastPromiseError, fail) => {
      if ($lastPromiseError && $lastPromiseError.status === 401) {
        this.dispatch(SpotifyController.TRIGGER_CLIENT_SPOTIFY_LOGIN);
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
     * Get the users player information (are they playing, etc.)
     */
    this.addListener('getPlayer', [
      (spotifyModel, fail) => {
        if (spotifyModel.refreshing) fail(undefined, true);
        spotifyModel.refreshing = true;
      },
      event(RestController.GET, spotifyModel => ({
        url: `${SPOTIFY_API}/me/player`,
        headers: spotifyModel.headers
      })),
      handle401Redirect,
      (spotifyModel, $lastPromiseResult) => {
        spotifyModel.player = $lastPromiseResult;
        spotifyModel.refreshing = false;
      }]);

    /**
     * Start the client-only login process.
     */
    this.addListener('triggerClientSpotifyLogin', [($detail, spotifyModel) => {
        let redirect_uri = `http://${window.location.hostname}:8080/spotify`;
        let url = $detail.url = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(spotifyModel.scopes)}`;

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

  busMounted() {
    if (!this.options.injections.spotifyModel.profile) {
      this.dispatch(SpotifyController.GET_USER_PROFILE).then($lastPromiseError => {
        if (!$lastPromiseError) {
          this.history.push('/music');
        }
      })
    }
  }
}