import React from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import AuthForm from '../AuthForm/index';
import SubNav from '../SubNav/index';
import MyProfile from '../MyProfile/index';
import AccountDragons from '../AccountDragons/index';
import PublicDragons from '../PublicDragons/index';

import store from '../../redux/store';
import './styles.css';

const AuthRoute = (props) => {
    let history = useHistory();
    if (!store.getState().account.loggedIn) {
        history.push("/");
        return <AuthForm />;
    }

    const { component, path } = props;
    return <Route path={path} component={component} />
}

const MainContent = () => {
    return (
        <div className='main-content'>
            <Switch>
                <AuthRoute exact path='/' component={MyProfile} />
                <AuthRoute exact path='/account-dragons' component={AccountDragons} />
                <AuthRoute exact path='/public-dragons' component={PublicDragons} />
            </Switch>
        </div>
    )
}

export default MainContent;
