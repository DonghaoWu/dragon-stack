import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import store from './redux/store';

import App from './App';
import PublicDragons from './components/PublicDragons';
import AccountDragons from './components/AccountDragons';

import { fetchAuthenticated } from './redux/actions/accountActions';
import { fetchPublicDragons } from './redux/actions/publicDragonActions';

store.dispatch(fetchPublicDragons);

const AuthRoute = (props) => {
  if (!store.getState().account.loggedIn) {
    return <Redirect to={{ pathname: '/' }} />
  }
  const { component, path } = props;

  return <Route path={path} component={component} />
}

store.dispatch(fetchAuthenticated)
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <Router>
            <Switch>
              <AuthRoute path='/account-dragons' component={AccountDragons} />
              <AuthRoute exact path='/public-dragons' component={PublicDragons} />
              <Route exact path='/' component={App} />
            </Switch>
          </Router>
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  })