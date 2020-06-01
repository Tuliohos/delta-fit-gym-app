import React from 'react'
import {withRouter} from 'react-router-dom'

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'

import {successMessage, errorMessage} from '../../components/toastr'
import Card from '../../components/card'

import EmployeeService from '../../app/service/employeeService'

class EmployeeList extends React.Component{

    state = {
        name: "",
        cpf: "",
        email: "",
        employees: [],
        showConfirmDialog: false,
        employeeToDelete: undefined
    };

    constructor(){
        super();
        this.service = new EmployeeService();
        this.actionButtons = this.actionButtons.bind(this);
    }

    componentDidMount() {
        this.service.loadList()
            .then(response => this.setState({employees: response.data}))
            .catch(error => errorMessage(error));
    }

    renderEmployeeRegistration = () => {
        this.props.history.push('/cadastro-funcionario');
    }

    renderEmployeeEditing = (cod) => {
        this.props.history.push(`/cadastro-funcionario/${cod}`);
    }

    delete = () => {
        this.service.deleteEmployee(this.state.employeeToDelete.cod)
        .then(response => {
            const employees = this.state.employees;
            const index = employees.indexOf(this.state.employeeToDelete);
            employees.splice(index, 1);
            this.setState({employees: employees, showConfirmDialog: false});
            successMessage("Funcionário deletado com sucesso!");
        }).catch(error =>{
            errorMessage("Ocorreu um erro ao tentar deletar o funcionário");
        })
    }

    showConfirmDialog = (rowData) => {
        this.setState({ showConfirmDialog: true, employeeToDelete: rowData});
    }

    cancelDeleteAction = () => {
        this.setState({ showConfirmDialog: false, employeeCodeToDelete: undefined});
    }

    actionButtons(rowData){
        return(
            <div>
                <Button  
                    tooltip="Editar"
                    icon="pi pi-pencil"
                    className="p-button-secondary"
                    onClick={()=>this.renderEmployeeEditing(rowData.cod)}/>
                <Button  
                    tooltip="Excluir"
                    icon="pi pi-trash"
                    className="p-button-secondary"
                    onClick={()=>this.showConfirmDialog(rowData)}/>
            </div>   
        )
    }

    render() {

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.delete} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelDeleteAction} className="p-button-secondary"/>
            </div>
        )

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
                        <DataTable value={this.state.employees} responsive rowHover  paginator={true} rows={10} alwaysShowPaginator={false}>
                            <Column field="person.name" header="Nome" filter={true} sortable={true} />
                            <Column field="person.cpf" header="CPF" filter={true} style={{textAlign:'center'}}/>
                            <Column field="user.email"  header="E-mail" filter={true}/>
                            <Column field="cod" body={this.actionButtons} header="Ações" 
                                style={{textAlign: 'center', width: '10em', overflow: 'visible'}} />
                        </DataTable>
                    </div>
                </div>
                <Dialog header="Confirmação" 
                    visible={this.state.showConfirmDialog} 
                    style={{width: '50vw'}} 
                    footer={confirmDialogFooter}
                    modal={true}
                    onHide={() => this.setState({showConfirmDialog: false})}>
                    Confirma a exclusão deste funcionário ?
                </Dialog>
            </Card>
        );
    }
}

export default withRouter(EmployeeList); 