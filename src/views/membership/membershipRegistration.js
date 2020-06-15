import React from 'react'
import {withRouter} from 'react-router-dom'

import {successMessage, errorMessage} from '../../components/toastr'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'

import {Button} from 'primereact/button'
import {InputNumber} from 'primereact/inputnumber'

import MembershipService from '../../app/service/membershipService'

class MembershipRegistration extends React.Component{

    state = {
        cod: undefined,
        description: '',
        price: undefined,
        editing: false
    }

    constructor(){
        super();
        this.service = new MembershipService();
    }

    componentDidMount(){
        const params = this.props.match.params;
        if(params.cod){
            this.service
                .findByCod(params.cod)
                .then(response => {
                    const state = this.service.getStateFromMembership(response.data);
                    this.setState( {...state, editing: true} )
                }).catch(error =>{
                    errorMessage(error.response.data);
                })
        }
    }

    submit = () => {
        const membership = this.service.getMembershipFromState(this.state);
        
        try{
            this.service.validate(membership)
        }catch(error){
            const msgs = error.messages;
            msgs.forEach(msg => errorMessage(msg));
            return false;
        }

        this.service.save(membership)
            .then(response => {
                successMessage(this.state.editing ? 'Plano de usuário cadastrado com sucesso!' : 'Plano de usuário atualizado com sucesso!')
                this.props.history.push('/lista-planos-usuario');
            }).catch(error =>{
                errorMessage(error.response.data);
            });

    }

    cancel = () => {
        this.props.history.push('/lista-planos-usuario');
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return(
            <Card title={this.state.editing ? 'Edição de Plano de Usuário' : 'Cadastro de Plano de Usuário'}>

                <div className="row">
                    <div className="col-md-8">
                        <FormGroup label="Descrição: *" htmlFor="inputDescription">
                            <input type="text"
                                id="inputDescription"
                                value={this.state.description}
                                className="form-control"
                                name="description"
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup label="Preço: *" htmlFor="inputPrice">
                            <InputNumber
                                id="inputPrice"
                                value={this.state.price}
                                className="form-control-plaintext"
                                mode="currency"
                                currency="BRL"
                                name="price"
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>

                <div className="float-right">
                    <Button  
                        className="p-button-danger"
                        label="Cancelar"
                        icon="pi pi-times"
                        onClick={this.cancel}/>

                    <Button
                        className="p-button-success" 
                        label="Salvar"
                        icon="pi pi-save"
                        onClick={this.submit}/>
                </div>

            </Card>
        )
    }
} 

export default withRouter(MembershipRegistration);