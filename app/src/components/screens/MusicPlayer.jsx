import React from 'react';

import {RingaComponent, I18NModel, DataGrid, DataGridModel, TabNavigator, Tab} from 'ringa-fw-react';
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
      dependency(I18NModel, 'language')
    );

    this.setupGrid();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDispatchReady() {
    super.componentDispatchReady();

    this.dispatch(SpotifyController.GET_PLAYLIST_MUSIC, {
      playlistId: this.props.match.params.playlistId
    }).then(spotifyModel => {
      this.playerDataGridModel.items = spotifyModel.music;
    });
  }

  render() {
    const {i18NModel} = this.state;

    return <div classes="fill">
      <DataGrid model={this.playerDataGridModel} classes="fill" />
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
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
