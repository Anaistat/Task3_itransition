import api from "../http/authorization.api";

export default class AuthorizationService{
    static async login(email, password){
        try{
            const response = await api.post('/login', {email, password})
            localStorage.token = response.data.tokens.accessToken
            return response.data.user
        }
        catch(error){
            return null
        }
    }

    static async registration(name, email, password){
        try {
            const response = await api.post('/registration', {name, email, password})
            localStorage.token = response.data.tokens.accessToken
            return response.data.user
        }
        catch(error){
            return null
        }
    }

    static async logout(){
       await api.post('/logout')
       localStorage.removeItem('token')
    }

    static async checkAuthorization() {
        try {
            const response = await api.post('/refresh' )
            localStorage.token = response.data.tokens.accessToken
            return response.data.user
        } catch (error) {
            return null
        }
    }
}