import React from 'react'
import {withRouter} from 'react-router-dom'

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'

import {errorMessage} from '../../components/toastr'
import Card from '../../components/card'

import EmployeeService from '../../app/service/employeeService'

class EmployeeList extends React.Component{

    state = {
        name: "",
        cpf: "",
        email: "",
        employees: []
    };

    constructor(){
        super();
        this.service = new EmployeeService();
    }

    componentDidMount() {
        this.service.loadList()
            .then(response => this.setState({employees: response.data}))
            .catch(error => errorMessage(error));
    }

    renderEmployeeRegistration = () => {
        this.props.history.push('/cadastro-funcionario');
    }

    render() {
        return (
            <Card title="Funcionários">
                <div className="row">
                    <div className="col-md-12">
                        <Button  
                            className="p-button-success float-right"
                            label="Adicionar"
                            icon="pi pi-plus"
                            onClick={this.renderEmployeeRegistration}/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <DataTable value={this.state.employees} paginator={true} rows={10}>
                            <Column field="person.name" header="Nome" filter={true} sortable={true}/>
                            <Column field="person.cpf" header="CPF" filter={true} style={{textAlign:'center'}}/>
                            <Column field="user.email"  header="E-mail" filter={true}/>
                        </DataTable>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(EmployeeList); 