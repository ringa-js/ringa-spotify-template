import React from 'react';

import {RingaComponent, Button, I18NModel} from 'ringa-fw-react';
import SpotifyController from './controllers/SpotifyController';

import {dependency} from 'react-ringa';

export default class Home extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.depend(dependency(I18NModel, 'language'));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {i18NModel} = this.state;

    return <div>
      <Button label={i18NModel.i18n('misc.connect')} onClick={this.login_onClickHandler} />
    </div>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  login_onClickHandler() {
    this.dispatch(SpotifyController.TRIGGER_CLIENT_SPOTIFY_LOGIN);
  }
}
