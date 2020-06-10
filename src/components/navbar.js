import React from 'react'
import NavbarItem from './navbar-item'
import{ AuthConsumer } from '../main/authenticationProvider'

function Navbar(props){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
            <a href="#/home" className="navbar-brand">Delta Fit Gym</a>
            <button className="navbar-toggler" type="button"
                 data-toggle="collapse" data-target="#navbarResponsive" 
                 aria-controls="navbarResponsive" aria-expanded="false" 
                 aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItem href="#/home" label="Home" render={props.isAuthenticatedUser} />
                <NavbarItem href="#/lista-funcionarios" label="Funcionários" render={props.isAuthenticatedUser}/>
                <NavbarItem href="#/lista-membros" label="Membros" render={props.isAuthenticatedUser}/>
                <NavbarItem href="#/lista-planos-usuario" label="Planos de usuário" render={props.isAuthenticatedUser}/>
                <NavbarItem href="#/login" label="Sair" render={props.isAuthenticatedUser} onClick={props.endSession}/>
            </ul>

            </div>
        </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar isAuthenticatedUser={context.isAuthenticatedUser} endSession={context.endSession}/>
        )}
    </AuthConsumer>
)