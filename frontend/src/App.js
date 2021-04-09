import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Home from './components/Home/index.js';
import AuthForm from './components/AuthForm/index.js';

const App = ({ account }) => {
  let history = useHistory();
  
  if (!account.loggedIn) {
    history.push("/");
    return <AuthForm />
  }

  return (
    <Home />
  )
}

const mapStateToProps = state => {
  return {
    account: state.account
  }
}

export default connect(mapStateToProps, null)(App);