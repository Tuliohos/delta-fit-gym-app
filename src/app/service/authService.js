import LocalStorageService from './localStorageService'

export const LOGGED_IN_USER = '_logged_in_user';

export default class AuthService {
    
    static isAuthenticatedUser(){
        const user = LocalStorageService.getItem(LOGGED_IN_USER);
        return user && user.cod;
    }

    static removeAuthenticatedUser(){
        LocalStorageService.removeItem(LOGGED_IN_USER);
    }

    static logIn(user){
        LocalStorageService.addItem(LOGGED_IN_USER, user)
    }

    static getAuthenticatedUser(){
        return LocalStorageService.getItem(LOGGED_IN_USER);
    }
}