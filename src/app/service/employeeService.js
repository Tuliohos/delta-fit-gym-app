import ApiService from '../apiservice'
import ValidationError from '../../expeption/validationError'

class EmployeeService extends ApiService{

    constructor(){
        super('/employee')
    }

    signIn(credencials){
        return this.post('/sign-in', credencials)
    }

    loadList(){
        return this.get('');
    }

    save(employee){
        return this.post('', employee);
    }

    deleteEmployee(cod){
        return this.delete(`/${cod}`);
    }

    findByCod(cod){
        return this.get(`/${cod}`);
    }

    getEmployeeFromState(state){
        return {
            cod: state.cod,
            person:{
                cod: state.personCod,
                name: state.name,
                cpf: state.cpf,
                phoneNumber: state.phoneNumber
            },
            user:{
                cod: state.userCod,
                email: state.email,
                password: state.password,
            },
            dateTimeHire: state.dateTimeHire,
            salary: state.salary
        }
    }

    getStateFromEmployee(employee){

        const state = {
            cod: employee.cod,
            personCod: employee.person.cod,
            name: employee.person.name,
            cpf: employee.person.cpf,
            phoneNumber: employee.person.phoneNumber,
            dateTimeHire: employee.dateTimeHire,
            salary: employee.salary,
            userCod: undefined,
            email: '',
            password: ''
        };
        
        if(employee.user){
            state.userCod = employee.user.cod;
            state.email = employee.user.email;
            state.password = employee.user.email;
        }
        
        return state;
    }

    validate(employee){
        const errors = []

        if(!employee.person.name){
            errors.push('O campo Nome é obrigatório.');
        }

        if(!employee.person.cpf){
            errors.push('O campo CPF é obrigatório.');
        }

        if(!employee.person.cpf){
            errors.push('O campo Salário é obrigatório.');
        }

        if(employee.user.email){

            if(!employee.user.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
                errors.push('Informe um E-mail válido');
            }
            
            if(!employee.user.password || !employee.user.password){
                errors.push('Informe a senha');
            }

        }
        
        if(employee.user.password && !employee.user.email){
            errors.push('Informe o e-mail');
        }

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

}

export default EmployeeService