import ApiService from '../apiservice'

class UserService extends ApiService{

    constructor(){
        super('/users')
    }

    authenticate(credencials){
        return this.post('/authenticate', credencials)
    }
}

export default UserService