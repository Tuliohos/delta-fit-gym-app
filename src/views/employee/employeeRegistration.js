import React from 'react'
import {withRouter} from 'react-router-dom'

import {successMessage, errorMessage} from '../../components/toastr'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'

import {Button} from 'primereact/button'
import {InputMask} from 'primereact/inputmask';
import {InputNumber} from 'primereact/inputnumber'

import EmployeeService from '../../app/service/employeeService'

class EmployeeRegistration extends React.Component{

    state = {
        cod: undefined,
        personCod: undefined,
        name: '',
        cpf: '',
        phoneNumber: '',
        userCod: undefined,
        email: '',
        password: '',
        dateTimeHire: undefined,
        salary: undefined,
        editing: false
    }

    constructor(){
        super();
        this.service = new EmployeeService();
    }

    componentDidMount(){
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
        console.log(employee);
        
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
                this.props.history.push('/lista-funcionario');
            }).catch(error =>{
                errorMessage(error.response.data);
            });

    }

    cancel = () => {
        this.props.history.push('/lista-funcionario');
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return(
            <Card title='Cadastro de Funcionário'>

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
                </div>

                <div className="row">
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
                </div>

                <div className="row">
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