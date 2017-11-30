import React from 'react';

import {RingaComponent, Button, I18NModel} from 'ringa-fw-react';
import {dependency} from 'react-ringa';
import SpotifyController from './controllers/SpotifyController';

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
      <Button label="Login" onClick={this.login_onClickHandler} />
    </div>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  login_onClickHandler() {
    this.dispatch(SpotifyController.TRIGGER_CLIENT_SPOTIFY_LOGIN);
  }
}
