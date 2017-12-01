import React from 'react';

import {RingaComponent, I18NModel, DataGrid, DataGridModel, TabNavigator, Tab} from 'ringa-fw-react';
import {dependency} from 'react-ringa';

import SpotifyController from '../../controllers/SpotifyController';
import SpotifyModel from '../../models/SpotifyModel';

export default class MusicList extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.depend(dependency(I18NModel, 'language'), dependency(SpotifyModel));

    this.setupGrid();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDispatchReady() {
    super.componentDispatchReady();

    this.dispatch(SpotifyController.GET_PLAYLISTS).then(spotifyModel => {
      this.playListDataGridModel.items = spotifyModel.playlists;
    });
  }

  render() {
    const {i18NModel} = this.state;

    return <div classes="fill">
      <h1>{i18NModel.i18n('spotify.playlists')}</h1>
      <DataGrid model={this.playListDataGridModel} classes="fill" />
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  setupGrid() {
    let settings = { // see DataGridModel
      name: 'playlists',
      classes: 'form-revisions-data-grid',
      row: { // 'row' field gets injected into the DataGridDimensionRow
        defaultRowHeightPx: 50,
        displayRowCount: 20,
        headerSettings: { // 'headerSettings', see DataGridHeaderSettings
          autoFocusSearch: true
        },
        maxHeight: 'inherit',
        onClick: this.playlists_rowOnClickHandler
      }
    };

    let columns = [{
      field: 'name'
    }, {
      field: 'collaborative'
    }, {
      field: 'public'
    }];

    this.playListDataGridModel = DataGridModel.constructDefaultRowColumnModel(columns, undefined, settings);
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  playlists_rowOnClickHandler(nodeContext) {
    const {spotifyModel} = this.state;

    spotifyModel.curPlaylistID = nodeContext.node.id;

    this.props.history.push(`/music/playlist/${nodeContext.node.id}`);
  }
}
