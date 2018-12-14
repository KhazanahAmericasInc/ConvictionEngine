import React, { Component } from 'react'
import Routes from './components/routes/Routes';

export default class App extends Component {
  render() {
    const { childProps } = this.props;
    return (
      // App renders the proper route switch. 
      <Routes childProps={childProps} />
    )
  }
}