const TokenService = require('../services/token.service.js')
const ApiErrors = require("../exceptions/api.errors.js");

module.exports = (request, response, next) => {
    try{
        const authorization = request.headers.authorization
        if(!authorization){
            return next(ApiErrors.UnauthorizedError())
        }
        const accessToken = authorization.split(' ')[1]
        if(!accessToken){
            return next(ApiErrors.UnauthorizedError())
        }

        const userData = TokenService.validateAccessToken(accessToken)
        if(!userData){
            return next(ApiErrors.UnauthorizedError())
        }

        request.user = userData
        next()
    }
    catch(error){
        return next(ApiErrors.UnauthorizedError())
    }
}