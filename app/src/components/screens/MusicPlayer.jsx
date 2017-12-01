import React from 'react';

import {RingaComponent, I18NModel, DataGrid, DataGridModel, Button} from 'ringa-fw-react';
import {dependency} from 'react-ringa';

import SpotifyController from '../../controllers/SpotifyController';
import SpotifyModel from '../../models/SpotifyModel';

export default class MusicPlayer extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.depend(
      dependency(I18NModel, 'language'),
      dependency(SpotifyModel, ['player', 'music'])
    );

    this.setupGrid();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDispatchReady() {
    const {spotifyModel} = this.props;

    super.componentDispatchReady();

    this.props.history.listen(location => {
      this.loadMusic();
    });

    this.loadMusic();

    this.dispatch(SpotifyController.GET_PLAYER);
  }

  render() {
    const {i18NModel, player} = this.state;

    if (!player) {
      return <div></div>;
    }

    return <div classes="fill">
      <h1>{i18NModel.i18n('spotify.music')}</h1>
      {i18NModel.i18n(player.is_playing ? 'spotify.playing' : 'spotify.paused')}
      <DataGrid model={this.playerDataGridModel} classes="fill" />
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  loadMusic() {
    const {spotifyModel} = this.state;

    spotifyModel.watchUntil(spotifyModel => spotifyModel.profile, () => {
      this.dispatch(SpotifyController.GET_PLAYLIST_MUSIC, {
        playlistId: this.props.match.params.playlistId
      }).then(spotifyModel => {
        this.playerDataGridModel.items = spotifyModel.music;
      });
    });
  }

  setupGrid() {
    let settings = { // see DataGridModel
      name: 'music',
      classes: 'form-revisions-data-grid',
      row: { // 'row' field gets injected into the DataGridDimensionRow
        defaultRowHeightPx: 50,
        displayRowCount: 20,
        headerSettings: { // 'headerSettings', see DataGridHeaderSettings
          autoFocusSearch: true
        },
        maxHeight: 'inherit',
        onClick: this.music_rowOnClickHandler
      }
    };

    let columns = [{
      title: 'Album',
      field: 'track.album.name'
    }, {
      title: 'Song',
      field: 'track.name'
    }];

    this.playerDataGridModel = DataGridModel.constructDefaultRowColumnModel(columns, undefined, settings);
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  music_rowOnClickHandler(nodeContext, event) {
    this.dispatch(SpotifyController.PLAY, {
      tracks: {
        uris: [`${nodeContext.node.track.uri}`]
      }
    });
  }
}
