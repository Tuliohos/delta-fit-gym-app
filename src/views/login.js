import React from 'react'
import {withRouter} from 'react-router-dom'

import UsuarioService from '../app/service/userService'
import LocalStorageService from '../app/service/localStorageService'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { errorMessage } from '../components/toastr'

class Login extends React.Component{

    state = {
        email: '',
        password: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
        this.localStorageService = new LocalStorageService();
    }
    
    login = async () => {
        this.service.autenticar({
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            this.localStorageService.addItem('_authenticated_user', response.data);
            this.history.push('/home')
        }).catch(error => {
            errorMessage(error.response.data)
        })
    }

    render (){
        return (
            <div className="row">
                <div className="col-md-6" style={ {position: 'relative', left: '308px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                            <input type="email" 
                                                value={this.state.email}
                                                onChange={e => this.setState({email: e.target.value})}
                                                className="form-control" 
                                                id="inputEmail" 
                                                aria-describedby="emailHelp" 
                                                placeholder="Digite o Email"/>    
                                            </FormGroup>  
                                            <FormGroup label="Senha: *" htmlFor="inputPassword1">
                                            <input type="password"
                                                value={this.state.password}
                                                onChange={e => this.setState({password: e.target.value})} 
                                                className="form-control"  
                                                id="inputPassword1"
                                                placeholder="Password"/>
                                            </FormGroup>

                                            <button onClick={this.login} 
                                                className="btn btn-success float-right">
                                                <i className="pi pi-sign-in"></i> Entrar
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default withRouter(Login)