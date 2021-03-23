import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';

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
    }
    const { component, path } = props;

    return <Route path={path} component={component} />
}

const MainContent = ({ accountInfo }) => {
    return (
        <div className='main-content'>
            <SubNav />
            <Switch>
                <AuthRoute exact path='/' component={MyProfile} />
                <AuthRoute exact path='/account-dragons' component={AccountDragons} />
                <AuthRoute exact path='/public-dragons' component={PublicDragons} />
            </Switch>
        </div>
    )
}

export default MainContent;
