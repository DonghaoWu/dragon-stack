import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/accountActions';
import SubNav from './SubNav';
import Generation from './Generation';
import { Link } from 'react-router-dom';
import Dragon from './Dragon';
import AccountInfo from './AccountInfo';
import store from '../redux/store';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import PublicDragons from './PublicDragons';
import AccountDragons from './AccountDragons';
import MyProfile from './MyProfile';

const AuthRoute = (props) => {
    if (!store.getState().account.loggedIn) {
        return <Redirect to={{ pathname: '/' }} />
    }
    const { component, path } = props;

    return <Route path={path} component={component} />
}

const MainContent = ({ logout, accountInfo }) => {
    return (
        <div className='main-content'>
            <Router>
                <SubNav />
                <Switch>
                    <AuthRoute exact path='/' component={MyProfile} />
                    <AuthRoute path='/account-dragons' component={AccountDragons} />
                    <AuthRoute exact path='/public-dragons' component={PublicDragons} />
                </Switch>
            </Router>
        </div>
    )
}

export default MainContent;
