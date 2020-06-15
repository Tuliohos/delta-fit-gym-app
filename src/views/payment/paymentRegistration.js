import React from 'react'
import {withRouter} from 'react-router-dom'

import {successMessage, errorMessage} from '../../components/toastr'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'

import {Button} from 'primereact/button'
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';

import PaymentService from '../../app/service/paymentService'
import MemberService from '../../app/service/memberService'

class PaymentRegistration extends React.Component{

    state = {
        cod: undefined,
        description: '',
        dateTimeRecord: undefined,
        value: undefined,
        status: '',
        method: '',
        memberCod: undefined,
        members: [],
        editing: false
    }

    constructor(){
        super();
        this.service = new PaymentService();
        this.memberService = new MemberService();
    }

    componentDidMount(){
        this.memberService.loadList()
            .then( response => {
                this.setState({members: response.data})
            }).catch(error =>{
                errorMessage(error.response.data);
            });

        const params = this.props.match.params;
        if(params.cod){
            this.service
                .findByCod(params.cod)
                .then(response => {
                    const state = this.service.getStateFromPayment(response.data);
                    this.setState( {...state, editing: true} )
                }).catch(error =>{
                    errorMessage(error.response.data);
                })
        }
    }

    submit = () => {
        const payment = this.service.getPaymentFromState(this.state);
        
        try{
            this.service.validate(payment)
        }catch(error){
            const msgs = error.messages;
            msgs.forEach(msg => errorMessage(msg));
            return false;
        }

        this.service.save(payment)
            .then(response => {
                successMessage(this.state.editing ? 'Pagamento cadastrado com sucesso!' : 'Pagamento atualizado com sucesso!')
                this.props.history.push('/lista-pagamentos');
            }).catch(error =>{
                errorMessage(error.response.data);
            });

    }

    cancel = () => {
        this.props.history.push('/lista-pagamentos');
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        const statusList = this.service.getStatusList();
        const methodList = this.service.getMethodList();

        return(
            <Card title= {this.state.editing ? 'Edição de Pagamento' : 'Cadastro de Pagamento'}>

                <div className="row">
                    <div className="col-md-12">
                        <FormGroup label="Descrição: *" htmlFor="inputDescription">
                            <input type="text"
                                id="inputDescription"
                                value={this.state.description}
                                className="form-control"
                                name="description"
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="Valor: *" htmlFor="inputValue">
                            <InputNumber
                                id="inputValue"
                                value={this.state.value}
                                className="form-control-plaintext"
                                mode="currency"
                                currency="BRL"
                                name="value"
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup label="Membro: *" htmlFor="inputMember">
                            <Dropdown 
                                id="inputMember"
                                optionLabel="name" 
                                optionValue="cod" 
                                className="form-control-plaintext"
                                value={this.state.memberCod} 
                                options={this.state.members}
                                disabled={this.state.editing} 
                                name="memberCod"
                                onChange={this.handleChange} 
                                placeholder="Selecione um membro"/>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">
                        <FormGroup label="Forma: *" htmlFor="inputType">
                            <Dropdown 
                                id="inputType"
                                optionLabel="label" 
                                optionValue="value" 
                                className="form-control-plaintext"
                                value={this.state.method} 
                                options={methodList}
                                name="method"
                                onChange={this.handleChange} 
                                placeholder="Selecione um tipo"/>
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup label="Status: *" htmlFor="inputStatus">
                            <Dropdown 
                                id="inputStatus"
                                optionLabel="label" 
                                optionValue="value" 
                                className="form-control-plaintext"
                                value={this.state.status} 
                                options={statusList}
                                name="status"
                                onChange={this.handleChange} 
                                placeholder="Selecione um status"/>
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

export default withRouter(PaymentRegistration);