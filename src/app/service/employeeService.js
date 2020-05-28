import ApiService from '../apiservice'

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
}

export default EmployeeService