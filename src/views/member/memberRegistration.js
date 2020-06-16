import React from 'react'
import {withRouter} from 'react-router-dom'

import {successMessage, errorMessage} from '../../components/toastr'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'

import {Button} from 'primereact/button'
import {InputMask} from 'primereact/inputmask';
import {Dropdown} from 'primereact/dropdown';

import MemberService from '../../app/service/memberService'
import MembershipService from '../../app/service/membershipService'

class MemberRegistration extends React.Component{

    state = {
        cod: undefined,
        personCod: undefined,
        name: '',
        cpf: '',
        gender: '',
        phoneNumber: '',
        membershipCod: undefined,
        dateTimeRegistration: undefined,
        memberships: [],
        genders: [],
        editing: false
    }

    constructor(){
        super();
        this.service = new MemberService();
        this.membershipService = new MembershipService();
    }

    componentDidMount(){
        this.membershipService.loadList()
        .then(response => {
            this.setState({memberships: response.data});
        }).catch(error =>{
            errorMessage(error.response.data);
        })

        this.setState({genders: this.service.getGenderList()})

        const params = this.props.match.params;
        if(params.cod){
            this.service
                .findByCod(params.cod)
                .then(response => {
                    const state = this.service.getStateFromMember(response.data);
                    this.setState( {...state, editing: true} )
                }).catch(error =>{
                    errorMessage(error.response.data);
                })
        }
    }

    submit = () => {
        const member = this.service.getMemberFromState(this.state);
        
        try{
            this.service.validate(member)
        }catch(error){
            const msgs = error.messages;
            msgs.forEach(msg => errorMessage(msg));
            return false;
        }

        this.service.save(member)
            .then(response => {
                successMessage(this.state.editing ? 'Membro atualizado com sucesso!' : 'Membro cadastrado com sucesso!');
                this.props.history.push('/lista-membros');
            }).catch(error =>{
                errorMessage(error.response.data);
            });

    }

    cancel = () => {
        this.props.history.push('/lista-membros');
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return(
            <Card title={this.state.editing ? 'Edição de Membro' : 'Cadastro de Membro'}>

                <div className="row">
                    <div className="col-md-12">
                        <FormGroup label="Nome: *" htmlFor="inputName">
                            <input type="text"
                                id="inputName"
                                value={this.state.name}
                                className="form-control"
                                name="name"
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="CPF: *" htmlFor="inputCPF">
                            <InputMask
                                mask="999.999.999-99"
                                id="inputCPF"
                                value={this.state.cpf}
                                className="form-control"
                                name="cpf"
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup label="Plano de usuário: *" htmlFor="inputMembership">
                            <Dropdown optionLabel="description" 
                                optionValue="cod" 
                                className="form-control-plaintext"
                                value={this.state.membershipCod} 
                                options={this.state.memberships} 
                                name="membershipCod"
                                onChange={this.handleChange} 
                                placeholder="Selecione um plano"/>
                        </FormGroup>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="Gênero: *" htmlFor="inputGender">
                            <Dropdown optionLabel="label" 
                                optionValue="value" 
                                className="form-control-plaintext"
                                value={this.state.gender} 
                                options={this.state.genders} 
                                name="gender"
                                onChange={this.handleChange} 
                                placeholder="Selecione um gênero"/>
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup label="Telefone:" htmlFor="inputPhoneNumber">
                            <input type="text"
                                id="inputPhoneNumber"
                                value={this.state.phoneNumber}
                                className="form-control"
                                name="phoneNumber"
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

export default withRouter(MemberRegistration);