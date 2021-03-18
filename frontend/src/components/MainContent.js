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
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import AuthForm from './AuthForm'


import PublicDragons from './PublicDragons';
import AccountDragons from './AccountDragons';
import MyProfile from './MyProfile';

const AuthRoute = (props) => {
    let history = useHistory();
    if (!store.getState().account.loggedIn) {
        history.push("/");
    }
    const { component, path } = props;

    return <Route path={path} component={component} />
}

const MainContent = ({ logout, accountInfo }) => {
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
