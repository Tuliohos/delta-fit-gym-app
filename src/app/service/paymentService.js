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
            method: state.method,
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
            method: payment.method,
            memberCod: payment.member.cod,
            memberName: payment.member.person.name
        };
    }

    getYearsList(){
        return this.get('/years');
    }

    getMonthlyEarnings(year){
        return this.get(`/earnings/${year}`)
    }

    validate(payment){
        const errors = []

        if(!payment.description){
            errors.push('O campo Descrição é obrigatório.');
        }

        if(!payment.value){
            errors.push('O campo Valor é obrigatório.');
        }

        if(!payment.status){
            errors.push('O campo Status é obrigatório.');
        }

        if(!payment.method){
            errors.push('O campo Forma é obrigatório.');
        }

        if(!payment.member.cod){
            errors.push('O campo Membro é obrigatório.');
        }

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

    getMethodList(){
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
            {label: 'Efetivado', value: 'COMPLETED'}
        ]
    }

    translateLabels(paymentList){
        paymentList.forEach(payment => {
            payment.status = this.getStatusDescription(payment.status);
            payment.method = this.getMethodDescription(payment.method);
        });
    }

    getStatusDescription(status){
        switch(status){
            case 'PENDING':
                return 'Pendente';
            case 'COMPLETED':
                return 'Efetivado';
            case 'CANCELED':
                return 'Cancelado';
            default: 
                return '';
        }
    }

    getMethodDescription(method){
        switch(method){
            case 'CASH':
                return 'Dinheiro';
            case 'CREDIT_CARD':
                return 'Cartão de crédito';
            case 'PICPAY':
                return 'Picpay';
            default: 
                return '';
        }
    }

}

export default PaymentService