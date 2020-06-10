import ApiService from '../apiservice'
import ValidationError from '../../expeption/validationError'

class MembershipService extends ApiService{

    constructor(){
        super('/membership')
    }

    loadList(){
        return this.get('');
    }

    save(membership){
        return this.post('', membership);
    }

    deleteMembership(cod){
        return this.delete(`/${cod}`);
    }

    findByCod(cod){
        return this.get(`/${cod}`);
    }

    getMembershipFromState(state){
        return {
            cod: state.cod,
            description: state.description,
            price: state.price
        }
    }

    getStateFromMembership(membership){
        return {
            cod: membership.cod,
            description: membership.description,
            price: membership.price,
            
        };
    }

    validate(membership){
        const errors = []

        if(!membership.description){
            errors.push('O campo Descrição é obrigatório.');
        }

        if(!membership.price){
            errors.push('O campo Preço é obrigatório.');
        }

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

}

export default MembershipService