const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token.js")

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    async saveToken(userID, refreshToken){
        const tokenData = await TokenModel.findOne({user: userID})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return TokenModel.create({user: userID, refreshToken})
    }

    async removeToken(refreshToken){
        return TokenModel.deleteOne({refreshToken})
    }

    async findToken(refreshToken){
        return TokenModel.findOne({refreshToken})
    }

    validateAccessToken(accessToken){
        return jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET)
    }

    validateRefreshToken(refreshToken){
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    }

}

module.exports = new TokenService()