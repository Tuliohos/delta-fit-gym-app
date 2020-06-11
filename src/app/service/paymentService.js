import ApiService from '../apiservice'
import ValidationError from '../../expeption/validationError'

class PaymentService extends ApiService{

    constructor(){
        super('/payment')
    }

    loadList(){
        return this.get('');
    }

    save(payment){
        return this.post('', payment);
    }

    cancelPayment(cod){
        return this.delete(`/${cod}`);
    }

    findByCod(cod){
        return this.get(`/${cod}`);
    }

    getPaymentFromState(state){
        return {
            cod: state.cod,
            description: state.description,
            dateTimeRecord: state.dateTimeRecord,
            value: state.value,
            status: state.status,
            type: state.type,
            member: {
                cod: state.memberCod
            }
        }
    }

    getStateFromPayment(payment){
        return {
            cod: payment.cod,
            description: payment.description,
            dateTimeRecord: payment.dateTimeRecord,
            value: payment.value,
            status: payment.status,
            type: payment.type,
            memberCod: payment.member.cod,
            memberName: payment.member.person.name
        };
    }

    getTypeList(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Dinheiro', value: 'CASH'},
            {label: 'Cartão de Crédito', value: 'CREDIT_CARD'},
            {label: 'Picpay', value: 'PICPAY'},
        ]
    }

    getStatusList(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Pendente', value: 'PENDING'},
            {label: 'Efetivado', value: 'EFFECTIVE'},
            {label: 'Atrasado', value: 'LATE'},
            {label: 'Cancelado', value: 'CANCELED'}
        ]
    }

    /*statusHandler(status){

        switch(status){
            case 'PENDING':
                return {label: 'Pendente', value: 'PENDING'};
            case 'EFFECTIVE':
                return {label: 'Efetivado', value: 'EFFECTIVE'};
            case 'LATE':
                return {label: 'Atrasado', value: 'LATE'};
            case 'CANCELED':
                return {label: 'Cancelado', value: 'CANCELED'};
            default:
                return {label: 'N/D', value: ''};
        }
    }

    typeHandler(type){

        switch(type){
            case 'CASH':
                return {label: 'Dinheiro', value: 'CASH'};
            case 'CREDIT_CARD':
                return {label: 'Cartão de Crédito', value: 'CREDIT_CARD'};
            case 'PICPAY':
                return {label: 'Picpay', value: 'PICPAY'};
            default:
                return {label: 'N/D', value: ''};
        }
    }*/

    validate(payment){
        const errors = []

        if(!payment.value){
            errors.push('O campo Valor é obrigatório.');
        }

        if(!payment.status){
            errors.push('O campo Status é obrigatório.');
        }

        if(!payment.type){
            errors.push('O campo Tipo é obrigatório.');
        }

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

}

export default PaymentService