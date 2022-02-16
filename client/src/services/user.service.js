import api from "../http/authorization.api";

export default class UserService{
    static async getUsers(){
        try {
            let response = await api.get('/getusers')
            response.data.forEach(e=>{
                e.registrationDate = new Date(e.registrationDate)
                e.lastLoginDate = new Date(e.lastLoginDate)
                e.isChecked = false
            })
            return response.data
        }
        catch(error){
            return []
        }
    }

    static async changeStatus(userId, status){
        try{
            await api.post('/modifyuserstatus', {id: userId, status})
            return true

        }
        catch(error){
            return false
        }
    }
}