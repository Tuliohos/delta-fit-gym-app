import ApiService from '../apiservice'
import ValidationError from '../../expeption/validationError'

class MemberService extends ApiService{

    constructor(){
        super('/member');
    }

    loadList(){
        return this.get('');
    }

    save(member){
        return this.post('', member);
    }

    deleteMember(cod){
        return this.delete(`/${cod}`);
    }

    findByCod(cod){
        return this.get(`/${cod}`);
    }

    getMemberFromState(state){
        return {
            cod: state.cod,
            person:{
                cod: state.personCod,
                name: state.name,
                cpf: state.cpf,
                gender: state.gender,
                phoneNumber: state.phoneNumber
            },
            membership:{
                cod: state.membershipCod,
                description: state.membershipDescription
            },
            dateTimeRegistration: state.dateTimeRegistration
        }
    }

    getStateFromMember(member){

        return {
            cod: member.cod,
            personCod: member.person.cod,
            name: member.person.name,
            cpf: member.person.cpf,
            gender: member.person.gender,
            phoneNumber: member.person.phoneNumber,
            dateTimeRegistration: member.dateTimeRegistration,
            membershipCod: member.membership.cod,
            membershipDescription: member.membership.description
        };
    }

    getGenderDescription(gender){
        switch(gender){
            case "M":
                return "Masculino";
            case "F":
                return "Feminino";
            case "I":
                return "Indefinido";
            default: 
                return "Nenhuma das opções";
        }
    }

    getGenderList(){
        return [
            {label: "Masculino", value:"M"},
            {label: "Feminino", value:"F"},
            {label: "Indefinido", value:"I"},
        ]
    }

    getMembersGenderChartData(){
        return this.get('/genders-chart');
    }

    validate(member){
        const errors = []

        if(!member.person.name){
            errors.push('O campo Nome é obrigatório.');
        }

        if(!member.person.cpf){
            errors.push('O campo CPF é obrigatório.');
        }
        
        if(!member.membership.cod){
            errors.push('O campo Plano de usuário é obrigatório.');
        }
        
        if(!member.person.gender){
            errors.push('O campo Gênero é obrigatório.');
        }

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

}

export default MemberService