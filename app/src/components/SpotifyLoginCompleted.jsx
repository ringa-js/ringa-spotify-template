import React from 'react';

import {RingaComponent, I18NModel} from 'ringa-fw-react';
import {dependency} from 'react-ringa';

import SpotifyController from '../controllers/SpotifyController';
import SpotifyModel from '../models/SpotifyModel';

export default class SpotifyLoginCompleted extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.depend(dependency(I18NModel, 'language'), dependency(SpotifyModel, 'token'));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDispatchReady() {
    super.componentDispatchReady();

    this.dispatch(SpotifyController.DECODE_SPOTIFY_REDIRECT);
  }

  render() {
    const {i18NModel, token} = this.state;

    return <div>
      Your account has been linked and your token is: {token}.
    </div>;
  }
}
