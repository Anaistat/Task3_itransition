const { validationResult } = require("express-validator");
const ApiErrors = require("../exceptions/api.errors.js");
const UserService = require("../services/user.service.js");


class UserController{
    async getUsers(request, response, next){
       try{
           return response.status(200).json(await UserService.getAllUsers())
       } catch (error) {
           next(error)
       }
    }

    async modifyUserStatus(request, response, next){
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.BadRequest('Unknown user status or user ID', errors.array()))
            }
            const {id, status} = request.body
            await UserService.modifyStatus(id, status)
            return response.status(200).json()
        }
        catch (error) {
            next(error)
        }
    }

    async login(request, response, next){
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.BadRequest('Login validation error', errors.array()))
            }
            const {email, password} = request.body
            const userData = await UserService.login(email, password)
            response.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 2592000000, httpOnly: true})
            return response.status(200).json(userData)
        }
        catch (error) {
            next(error)
        }

    }

    async registration(request, response, next){
        try{
            const errors = validationResult(request)
            if(!errors.isEmpty()){
                return next(ApiErrors.BadRequest('Validation error', errors.array()))
            }
            const {name, email, password} = request.body
            const userData = await UserService.registration(name, email, password)
            response.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return response.status(200).json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logout(request, response, next){
        try {
            let {refreshToken} = request.cookies
            const token = await UserService.logout(refreshToken)
            response.clearCookie('refreshToken')
            return response.status(200).json(token)
        } catch (error) {
            next(error)
        }
    }

    async refresh(request, response, next){
        try{
            const { refreshToken } = request.cookies
            const userData = await UserService.refresh(refreshToken)
            response.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 2592000000, httpOnly: true})
            return response.status(200).json(userData)
        }
        catch(error){
            next(error)
        }
    }
}

module.exports = new UserController()