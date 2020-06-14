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

    getMonthDescription(month){
        switch(month){
            case 'JANUARY':
                return 'Janeiro'
            case 'FEBRUARY':
                return 'Fevereiro'
            case 'MARCH':
                return 'Março'
            case 'APRIL':
                return 'Abril'
            case 'MAY':
                return 'Maio'
            case 'JUNE':
                return 'Junho'
            case 'JULY':
                return 'Julho'
            case 'AUGUST':
                return 'Agosto'
            case 'SEPTEMBER':
                return 'Setembro'
            case 'OCTOBER':
                return 'Outubro'
            case 'NOVEMBER':
                return 'Novembro'
            case 'DECEMBER':
                return 'Dezembro'
            default: return ''
        }
    }

    getYearsList(){
        return this.get('/years');
    }

    getMonthlyEarnings(year){
        return this.get(`/earnings/${year}`)
    }

    validate(payment){
        const errors = []

        if(!payment.value){
            errors.push('O campo Valor é obrigatório.');
        }

        if(!payment.status){
            errors.push('O campo Status é obrigatório.');
        }

        if(!payment.method){
            errors.push('O campo Forma é obrigatório.');
        }

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

}

export default PaymentService