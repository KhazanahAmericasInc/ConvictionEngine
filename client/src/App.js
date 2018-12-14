import React, { Component } from 'react'
import Home from './components/home/Home';
import Routes from './components/routes/Routes';

export default class App extends Component {
  render() {
    const { childProps } = this.props;
    return (
      <Routes childProps={childProps} />
    )
  }
}