import React from 'react'

import { AuthConsumer } from '../main/authenticationProvider'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import Login from '../views/login'
import Home from '../views/home'
import EmployeeList from '../views/employee/employeeList'
import EmployeeRegistration from '../views/employee/employeeRegistration'
import MemberList from '../views/member/memberList'
import MemberRegistration from '../views/member/memberRegistration'
import MembershipList from '../views/membership/membershipList'
import MembershipRegistration from '../views/membership/membershipRegistration'
import PaymentList from '../views/payment/paymentList'
import PaymentRegistration from '../views/payment/paymentRegistration'

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
                <AuthenticatedRoute path="/lista-funcionarios" component={EmployeeList} isAuthenticatedUser={props.isAuthenticatedUser}/>
                <AuthenticatedRoute path="/cadastro-funcionario/:cod?" component={EmployeeRegistration} isAuthenticatedUser={props.isAuthenticatedUser}/>
                <AuthenticatedRoute path="/lista-membros" component={MemberList} isAuthenticatedUser={props.isAuthenticatedUser}/>
                <AuthenticatedRoute path="/cadastro-membro/:cod?" component={MemberRegistration} isAuthenticatedUser={props.isAuthenticatedUser}/>
                <AuthenticatedRoute path="/lista-planos-usuario" component={MembershipList} isAuthenticatedUser={props.isAuthenticatedUser}/>
                <AuthenticatedRoute path="/cadastro-plano-usuario/:cod?" component={MembershipRegistration} isAuthenticatedUser={props.isAuthenticatedUser}/>
                <AuthenticatedRoute path="/lista-pagamentos" component={PaymentList} isAuthenticatedUser={props.isAuthenticatedUser}/>
                <AuthenticatedRoute path="/cadastro-pagamento/:cod?" component={PaymentRegistration} isAuthenticatedUser={props.isAuthenticatedUser}/>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Routes isAuthenticatedUser={context.isAuthenticated}/>) }
    </AuthConsumer>
)