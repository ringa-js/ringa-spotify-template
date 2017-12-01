import React from 'react';
import { Route } from 'react-router';

import ApplicationLayout from './layout/ApplicationLayout';
import Home from './Home';
import SpotifyLoginCompleted from './components/screens/SpotifyLoginCompleted';
import Playlist from './components/screens/Playlist';
import MusicList from './components/screens/MusicList';

export default (
  <Route path="/">
    <ApplicationLayout>
      <Route path="/" exact component={Home} />
      <Route path="/spotify" component={SpotifyLoginCompleted} />
      <Route path="/music" component={Playlist} />
      <Route path="/music/playlist/:playlistId" component={MusicList} />
    </ApplicationLayout>
  </Route>
);
