import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './redux/store';
import './client.css';
import App from './client/App';

const initialState = {
  users: [],
  currentPage: 1,
  userSurveyResults: {},
  userInfo: {},
  surveyContext: 'driver',
};

ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
