import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';

import App from './App';

import { fetchAuthenticated } from './redux/actions/accountActions';
import { fetchPublicDragons } from './redux/actions/publicDragonActions';

store.dispatch(fetchPublicDragons);

store.dispatch(fetchAuthenticated)
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  })