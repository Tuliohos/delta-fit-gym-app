import React from 'react'
import {withRouter} from 'react-router-dom'

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'

import {successMessage, errorMessage} from '../../components/toastr'
import Card from '../../components/card'

import MembershipService from '../../app/service/membershipService'

class MembershipList extends React.Component{

    state = {
        cod: undefined,
        description: '',
        price: undefined,
        memberships: [],
        membershipToDelete: null
    };

    constructor(){
        super();
        this.service = new MembershipService();
        this.actionButtons = this.actionButtons.bind(this);
    }

    componentDidMount() {
        this.service.loadList()
            .then(response => this.setState({memberships: response.data}))
            .catch(error => errorMessage(error));
    }

    renderMembershipRegistration = () => {
        this.props.history.push('/cadastro-plano-usuario');
    }

    renderMembershipEditing = (cod) => {
        this.props.history.push(`/cadastro-plano-usuario/${cod}`);
    }

    delete = () => {
        this.service.deleteMembership(this.state.membershipToDelete.cod)
        .then(response => {
            const memberships = this.state.memberships;
            const index = memberships.indexOf(this.state.membershipToDelete);
            memberships.splice(index, 1);
            this.setState({memberships: memberships, showConfirmDialog: false});
            successMessage("Plano de usuário deletado com sucesso!");
        }).catch(error =>{
            errorMessage("Ocorreu um erro ao tentar deletar o plano de usuário");
        })
    }

    showConfirmDialog = (rowData) => {
        this.setState({ showConfirmDialog: true, membershipToDelete: rowData});
    }

    cancelDeleteAction = () => {
        this.setState({ showConfirmDialog: false, membershipCodeToDelete: undefined});
    }

    actionButtons(rowData){
        return(
            <div>
                <Button  
                    tooltip="Editar"
                    icon="pi pi-pencil"
                    className="p-button-secondary"
                    onClick={()=>this.renderMembershipEditing(rowData.cod)}/>
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
                            onClick={this.renderMembershipRegistration}/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <DataTable value={this.state.memberships} responsive rowHover  paginator={true} 
                            rows={10} alwaysShowPaginator={false} emptyMessage="Não há planos de usuário cadastrados.">
                            <Column field="description" header="Descrição" filter={true} sortable={true} />
                            <Column field="price" header="Preço" filter={true}/>
                            <Column field="cod" body={this.actionButtons}  header="Ações" 
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
                    Confirma a exclusão deste plano ?
                </Dialog>
            </Card>
        );
    }
}

export default withRouter(MembershipList); 