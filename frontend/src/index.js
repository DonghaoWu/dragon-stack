import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import store from './redux/store';
import { fetchAuthenticated } from './redux/actions/accountActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

store.dispatch(fetchAuthenticated)
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  })