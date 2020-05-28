import React from 'react'
import {withRouter} from 'react-router-dom'
import EmployeeService from '../../app/service/employeeService'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'

import {errorMessage} from '../../components/toastr'

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
            .then(data => this.setState({employees: data}))
            .catch(error => errorMessage(error));
    }

    render() {
        return (
            <DataTable value={this.state.employees}>
                <Column field="person.name" header="Nome" />
                <Column field="person.cpf" header="CPF" />
                <Column field="user.email" header="E-mail" />
            </DataTable>
        );
    }
}

export default withRouter(EmployeeList); 