import React from 'react';

import {setup as setupI18N} from '../i18n';

import Header from './Header';
import Footer from './Footer';

import AppController from '../controllers/AppController';
import RestController from '../controllers/RestController';
import SpotifyController from '../controllers/SpotifyController';

import {DefaultApplicationRoot} from 'ringa-fw-react';

import './ApplicationLayout.scss';

export default class ApplicationLayout extends DefaultApplicationRoot {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props, {
      disableDefaultI18N: false,
      disableScreenController: false
    });

    setupI18N(this.i18NModel);

    this.attach(new RestController());
    this.attach(new AppController());
    this.attach(new SpotifyController());
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return super.render(
      <div className="fill">
        <Header {...this.props} />
        <div className="container">
          {this.props.children}
        </div>
        <Footer />
      </div>);
  }
}
