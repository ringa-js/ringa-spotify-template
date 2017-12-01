import React from 'react';

import {RingaComponent, I18NModel, DataGrid, DataGridModel, Button} from 'ringa-fw-react';
import {dependency} from 'react-ringa';

import SpotifyController from '../../controllers/SpotifyController';
import SpotifyModel from '../../models/SpotifyModel';

import './Player.scss';

export default class Player extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.depend(
      dependency(I18NModel, 'language'),
      dependency(SpotifyModel, ['player'])
    );
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDispatchReady() {
    const {spotifyModel} = this.props;

    super.componentDispatchReady();

    this.dispatch(SpotifyController.GET_PLAYER);
  }

  render() {
    const {i18NModel, player} = this.state;

    if (!player) {
      return <div></div>;
    }

    return <div className="player">
      <div>
        <span>{i18NModel.i18n(player.is_playing ? 'spotify.playing' : 'spotify.paused')}</span>
        <span className="song"> {player.item.name} </span>
        <span> {i18NModel.i18n('spotify.on')} </span>
        <span>{player.device.name}</span>
      </div>
    </div>;
  }
}
