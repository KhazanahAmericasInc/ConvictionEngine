
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppliedRoute from './AppliedRoute'
import NotFound from './NotFound'
import Home from '../home/Home'

export default ({ childProps }) =>
    // This is the switch which selects which component to route
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path='/admin' exact component={Home} props={childProps} />
        { /* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
    </Switch>;