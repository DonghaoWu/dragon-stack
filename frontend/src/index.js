import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { fetchAuthenticated } from './actions/accountActions';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AccountDragons from './components/AccountDragons';
import { fetchPublicDragons } from './actions/publicDragonActions';
import PublicDragons from './components/PublicDragons';

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