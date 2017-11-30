import React from 'react';
import { Route } from 'react-router';

import ApplicationLayout from './layout/ApplicationLayout';
import Home from './Home';
import SpotifyLoginCompleted from './components/SpotifyLoginCompleted';

export default (
  <Route path="/">
    <ApplicationLayout>
      <Route path="/" component={Home} />
      <Route path="/spotify" component={SpotifyLoginCompleted} />
    </ApplicationLayout>
  </Route>
);
