import React from 'react'
import {withRouter} from 'react-router-dom'

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import currencyFormatter from 'currency-formatter'

import {successMessage, errorMessage} from '../../components/toastr'
import Card from '../../components/card'

import PaymentService from '../../app/service/paymentService'

class PaymentList extends React.Component{

    state = {
        payments: [],
        paymentToDelete: null
    };

    constructor(){
        super();
        this.service = new PaymentService();
        this.actionButtons = this.actionButtons.bind(this);
    }

    componentDidMount() {
        this.service.loadList()
            .then(response => {
                this.service.translateLabels(response.data);
                this.setState({payments: response.data})
            })
            .catch(error => errorMessage(error));
    }

    renderPaymentRegistration = () => {
        this.props.history.push('/cadastro-pagamento');
    }

    renderPaymentEditing = (cod) => {
        this.props.history.push(`/cadastro-pagamento/${cod}`);
    }

    cancel = () => {
        this.service.cancelPayment(this.state.paymentToDelete.cod)
        .then(response => {
            const payments = this.state.payments;
            const index = payments.indexOf(this.state.paymentToDelete);
            payments[index].status = this.service.getStatusDescription('CANCELED');
            this.setState({payments, showConfirmDialog: false});
            successMessage("Pagamento cancelado com sucesso!");
        }).catch(error =>{
            errorMessage("Ocorreu um erro ao tentar cancelar o pagamento");
        })
    }

    showConfirmDialog = (rowData) => {
        this.setState({ showConfirmDialog: true, paymentToDelete: rowData});
    }

    cancelDeleteAction = () => {
        this.setState({ showConfirmDialog: false, paymentCodeToDelete: undefined});
    }

    actionButtons(rowData){
        return(
            <div>
                <Button  
                    tooltip="Editar"
                    icon="pi pi-pencil"
                    className="p-button-secondary"
                    disabled={rowData.status === "Cancelado" || rowData.status === "Efetivado"}
                    onClick={()=>this.renderPaymentEditing(rowData.cod)}/>
                <Button  
                    tooltip="Cancelar"
                    icon="pi pi-times"
                    className="p-button-secondary"
                    disabled={rowData.status === "Cancelado" || rowData.status === "Efetivado"}
                    onClick={()=>this.showConfirmDialog(rowData)}/>
            </div>   
        )
    }

    priceBody(rowData) {
        return <span>{currencyFormatter.format(rowData.value, {locale: 'pt-BR'})}</span>;
    }
    
    render() {

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.cancel} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelDeleteAction} className="p-button-secondary"/>
            </div>
        )

        return (
            <Card title="Pagamentos">
                <div className="row">
                    <div className="col-md-12">
                        <Button  
                            className="p-button-success float-right"
                            label="Adicionar"
                            icon="pi pi-plus"
                            onClick={this.renderPaymentRegistration}/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <DataTable value={this.state.payments} responsive rowHover  paginator={true} 
                            rows={10} alwaysShowPaginator={false} emptyMessage="Não há pagamentos cadastrados.">
                            <Column field="memberName" header="Membro" filter={true} sortable={true} />
                            <Column field="description" header="Descrição" filter={true}/>
                            <Column field="value" header="Valor" body={this.priceBody} filter={true}/>
                            <Column field="dateTimeRecord" header="Data de realização" filter={true} style={{textAlign:'center'}}/>
                            <Column field="method" header="Forma de pagamento" filter={true}/>
                            <Column field="status" header="Status" filter={true}/>
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
                    Confirma o cancelamento deste pagamento ?
                </Dialog>
            </Card>
        );
    }
}

export default withRouter(PaymentList); 