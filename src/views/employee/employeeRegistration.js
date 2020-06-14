import React from 'react'
import {withRouter} from 'react-router-dom'

import {successMessage, errorMessage} from '../../components/toastr'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'

import {Button} from 'primereact/button'
import {InputMask} from 'primereact/inputmask';
import {InputNumber} from 'primereact/inputnumber'
import {Dropdown} from 'primereact/dropdown';

import EmployeeService from '../../app/service/employeeService'
import MemberService from '../../app/service/memberService' 

class EmployeeRegistration extends React.Component{

    state = {
        cod: undefined,
        personCod: undefined,
        name: '',
        cpf: '',
        gender: '',
        phoneNumber: '',
        userCod: undefined,
        email: '',
        password: '',
        dateTimeHire: undefined,
        salary: undefined,
        position: '',
        genders: [],
        editing: false
    }

    constructor(){
        super();
        this.service = new EmployeeService();
        this.memberService = new MemberService();
    }

    componentDidMount(){
        this.setState({genders: this.memberService.getGenderList()})
        const params = this.props.match.params;
        if(params.cod){
            this.service
                .findByCod(params.cod)
                .then(response => {
                    const state = this.service.getStateFromEmployee(response.data);
                    this.setState( {...state, editing: true} )
                }).catch(error =>{
                    errorMessage(error.response.data);
                })
        }
    }

    submit = () => {
        const employee = this.service.getEmployeeFromState(this.state);
        
        try{
            this.service.validate(employee)
        }catch(error){
            const msgs = error.messages;
            msgs.forEach(msg => errorMessage(msg));
            return false;
        }

        this.service.save(employee)
            .then(response => {
                successMessage('Funcionário cadastrado com sucesso!')
                this.props.history.push('/lista-funcionarios');
            }).catch(error =>{
                errorMessage(error.response.data);
            });

    }

    cancel = () => {
        this.props.history.push('/lista-funcionarios');
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return(
            <Card title={this.state.editing ? 'Edição de Funcionário' : 'Cadastro de Funcionário'}>

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
                    <div className="col-md-12">
                        <FormGroup label="Cargo: *" htmlFor="inputPosition">
                            <input type="text"
                                id="inputPosition"
                                value={this.state.position}
                                className="form-control"
                                name="position"
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
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="Salário: *" htmlFor="inputSalary">
                            <InputNumber
                                id="inputSalary"
                                value={this.state.salary}
                                className="form-control-plaintext"
                                mode="currency"
                                currency="BRL"
                                name="salary"
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup label="E-mail:" htmlFor="inputEmail">
                            <input type="email"
                                id="inputEmail"
                                value={this.state.email}
                                className="form-control"
                                name="email"
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
               
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="Senha:" htmlFor="inputPassword">
                            <input type="password"
                                id="inputPassword"
                                value={this.state.password}
                                className="form-control"
                                name="password"
                                onChange={this.handleChange}/>
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

export default withRouter(EmployeeRegistration);