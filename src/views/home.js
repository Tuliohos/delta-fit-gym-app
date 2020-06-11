import React from 'react'
import { AuthContext } from '../main/authenticationProvider'

class Home extends React.Component{

    render(){
        return(
            <div>
                Bem vindo!
            </div>
        )
    }
}

Home.contextType = AuthContext

export default Home