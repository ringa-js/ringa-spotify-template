import React from 'react';
import {RingaComponent, I18NModel, I18NSwitcher, ScreenModel} from 'ringa-fw-react';
import {depend, dependency} from 'react-ringa';

import './Header.scss';

class Header extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    depend(this, [
      dependency(I18NModel, 'language'),
      dependency(ScreenModel, 'curBreakpointIx')
    ]);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render(props) {
    const {i18NModel, curBreakpointIx} = this.state;

    return <header className="app-header">
      <div className="title">
        <span>
          {i18NModel.i18n(curBreakpointIx < 1 ? 'header.shortTitle' : 'header.title')}
        </span>
      </div>
      <I18NSwitcher />
    </header>;
  }
}

export default Header;
