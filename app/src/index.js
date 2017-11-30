console.log('BUILD INFORMATION', __BUILD__);

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import routes from './routes';

import './styles/index.scss';

render(<BrowserRouter>{routes}</BrowserRouter>, document.querySelector('.react-app'));
