import React from 'react';
import {RingaComponent, I18NModel, I18NSwitcher, ScreenModel} from 'ringa-fw-react';
import {depend, dependency} from 'react-ringa';

import SpotifyModel from '../models/SpotifyModel';

import './Header.scss';

class Header extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    depend(this, [
      dependency(I18NModel, 'language'),
      dependency(ScreenModel, 'curBreakpointIx'),
      dependency(SpotifyModel, 'profile')
    ]);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render(props) {
    const {i18NModel, curBreakpointIx, profile = {}} = this.state;

    return <header className="app-header">
      <div className="title">
        <span>
          {i18NModel.i18n(curBreakpointIx < 1 ? 'header.shortTitle' : 'header.title')}
        </span>
      </div>
      <div className="login">
        {profile.display_name}
        <I18NSwitcher />
      </div>
    </header>;
  }
}

export default Header;
