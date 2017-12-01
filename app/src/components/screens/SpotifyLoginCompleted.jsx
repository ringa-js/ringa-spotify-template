import React from 'react';

import {RingaComponent, I18NModel, Button} from 'ringa-fw-react';
import {dependency} from 'react-ringa';

import SpotifyController from '../../controllers/SpotifyController';
import SpotifyModel from '../../models/SpotifyModel';

export default class SpotifyLoginCompleted extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.depend(
      dependency(I18NModel, 'language'),
      dependency(SpotifyModel, 'token')
    );
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
      <div>{i18NModel.i18n('spotifyLoginCompleted.main')}</div>
      <Button label={i18NModel.i18n('spotifyLoginCompleted.next')} onClick={this.connect_onClickHandler} />
    </div>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  connect_onClickHandler() {
    this.props.history.push('/music');
  }
}
