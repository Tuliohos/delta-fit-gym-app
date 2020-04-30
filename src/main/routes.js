import React from 'react'

import Login from '../views/login'
import Home from '../views/home'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

function Routes(){
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login"/> }/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
            </Switch>
        </HashRouter>
    )
}

export default Routes