import React from 'react'
import AuthService from '../app/service/authService'

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;

class AuthenticationProvider extends React.Component{

    state = {
        authenticatedUser: null,
        isAuthenticatedUser: false
    }

    initSession = (user) => {
        AuthService.logIn(user)
        this.setState({isAuthenticatedUser: true, authenticatedUser: user})
    }

    endSession = () => {
        AuthService.removeAuthenticatedUser()
        this.setState({isAuthenticatedUser: false, authenticatedUser: null})
    }

    render(){
        const contexto = {
            authenticatedUser: this.state.authenticatedUser,
            isAuthenticatedUser: this.state.isAuthenticatedUser,
            initSession: this.initSession,
            endSession: this.endSession
        }

        return(
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default AuthenticationProvider