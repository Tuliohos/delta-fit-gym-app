import React from 'react'

import { AuthConsumer } from '../main/authenticationProvider'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import Login from '../views/login'
import Home from '../views/home'
import EmployeeList from '../views/employee/employeeList'
import EmployeeRegistration from '../views/employee/employeeRegistration'

function AuthenticatedRoute( { component: Component, isAuthenticatedUser, ...props} ){
    return (
        <Route {... props} render={ (componentProps) => {
            if(isAuthenticatedUser){
                return(
                    <Component {...componentProps}/>
                )
            }else {
                return(
                    <Redirect to={ {pathname: '/login', state: { from: componentProps.location }} } />
                )
            }
        }} />
    )
}

function Routes(props){
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login"/> }/>
                <Route path="/login" component={Login}/>
               
                <AuthenticatedRoute path="/home" component={Home} isAuthenticatedUser={props.isAuthenticatedUser}/>
                <AuthenticatedRoute path="/lista-funcionario" component={EmployeeList} isAuthenticatedUser={props.isAuthenticatedUser}/>
                <AuthenticatedRoute path="/cadastro-funcionario/:cod?" component={EmployeeRegistration} isAuthenticatedUser={props.isAuthenticatedUser}/>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Routes isAuthenticatedUser={context.isAuthenticatedUser}/>) }
    </AuthConsumer>
)