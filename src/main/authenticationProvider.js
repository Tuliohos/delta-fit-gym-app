import React from 'react'
import AuthService from '../app/service/authService'

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;

class AuthenticationProvider extends React.Component{

    state = {
        authenticatedUser: null,
        isAuthenticated: false
    }

    initSession = (user) => {
        AuthService.logIn(user)
        this.setState({isAuthenticated: true, authenticatedUser: user})
    }

    endSession = () => {
        AuthService.removeAuthenticatedUser()
        this.setState({isAuthenticated: false, authenticatedUser: null})
    }

    render(){
        const context = {
            authenticatedUser: this.state.authenticatedUser,
            isAuthenticated: this.state.isAuthenticated,
            initSession: this.initSession,
            endSession: this.endSession
        }

        return(
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default AuthenticationProvider