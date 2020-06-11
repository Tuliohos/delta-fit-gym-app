import React from 'react'
import {withRouter} from 'react-router-dom'

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'

import {successMessage, errorMessage} from '../../components/toastr'
import Card from '../../components/card'

import MemberService from '../../app/service/memberService'

class MemberList extends React.Component{

    state = {
        cod: undefined,
        personCod: undefined,
        name: '',
        cpf: '',
        phoneNumber: '',
        dateTimeRegistration: '',
        membershipCod: undefined,
        membershipDescription: '',
        members: []
    };

    constructor(){
        super();
        this.service = new MemberService();
        this.actionButtons = this.actionButtons.bind(this);
    }

    componentDidMount() {
        this.service.loadList()
            .then(response => this.setState({members: response.data}))
            .catch(error => errorMessage(error));
    }

    renderMemberRegistration = () => {
        this.props.history.push('/cadastro-membro');
    }

    renderMemberEditing = (cod) => {
        this.props.history.push(`/cadastro-membro/${cod}`);
    }

    delete = () => {
        this.service.deleteMember(this.state.memberToDelete.cod)
        .then(response => {
            const members = this.state.members;
            const index = members.indexOf(this.state.memberToDelete);
            members.splice(index, 1);
            this.setState({members: members, showConfirmDialog: false});
            successMessage("Membro deletado com sucesso!");
        }).catch(error =>{
            errorMessage("Ocorreu um erro ao tentar deletar o membro");
        })
    }

    showConfirmDialog = (rowData) => {
        this.setState({ showConfirmDialog: true, memberToDelete: rowData});
    }

    cancelDeleteAction = () => {
        this.setState({ showConfirmDialog: false, memberCodeToDelete: undefined});
    }

    actionButtons(rowData){
        return(
            <div>
                <Button  
                    tooltip="Editar"
                    icon="pi pi-pencil"
                    className="p-button-secondary"
                    onClick={()=>this.renderMemberEditing(rowData.cod)}/>
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
                            onClick={this.renderMemberRegistration}/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <DataTable value={this.state.members} responsive rowHover  paginator={true} 
                            rows={10} alwaysShowPaginator={false} emptyMessage="Não há membros cadastrados.">
                            <Column field="name" header="Nome" filter={true} sortable={true} />
                            <Column field="cpf" header="CPF" filter={true} style={{textAlign:'center'}}/>
                            <Column field="dateTimeRegistration" header="Data de cadastro" style={{textAlign:'center'}} filter={true}/>
                            <Column field="membership"  header="Plano" filter={true}/>
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
                    Confirma a exclusão deste membro ?
                </Dialog>
            </Card>
        );
    }
}

export default withRouter(MemberList); 