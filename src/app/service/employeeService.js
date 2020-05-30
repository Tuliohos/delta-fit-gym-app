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

    getEmployeeFromState(state){
        return {
            person:{
                name: state.name,
                cpf: state.cpf,
                phoneNumber: state.phoneNumber
            },
            user:{
                email: state.email,
                password: state.password,
            },
            salary: state.salary
        }
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