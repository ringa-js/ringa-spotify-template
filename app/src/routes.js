import React from 'react';
import { Route } from 'react-router';

import ApplicationLayout from './layout/ApplicationLayout';
import Home from './Home';
import SpotifyLoginCompleted from './components/screens/SpotifyLoginCompleted';
import MusicList from './components/screens/MusicList';
import MusicPlayer from './components/screens/MusicPlayer';

export default (
  <Route path="/">
    <ApplicationLayout>
      <Route path="/" exact component={Home} />
      <Route path="/spotify" component={SpotifyLoginCompleted} />
      <Route path="/music" component={MusicList} />
      <Route path="/music/playlist/:playlistId" component={MusicPlayer} />
    </ApplicationLayout>
  </Route>
);
