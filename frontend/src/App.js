import React, { Component } from 'react';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      this.props.account.loggedIn ? <Home /> : <AuthForm />
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.account
  }
}

export default connect(mapStateToProps, null)(App);