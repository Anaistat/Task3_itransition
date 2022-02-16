const User = require("../models/User.js");
const ApiErrors = require("../exceptions/api.errors.js");
const bcrypt = require('bcrypt')
const TokenService = require('./token.service.js')
const UserDto = require("../dto/user.dto.js")
const TokenModel = require("../models/token.js");


class UserService {
    async registration(name, email, password){
        const candidate = await User.findOne({email})
        if (candidate) {
            throw ApiErrors.BadRequest(`[Error] Username with email ${email} already exists.`)
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await User.create({name, email, password: hashPassword, registrationDate: new Date()})
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return { tokens, user: userDto }
    }

    async login(email, password) {
        const user = await User.findOne({ email })
        if (!user) {
            throw ApiErrors.BadRequest(`Пользователь с таким email ${ email } не зарегистрирован.`)
        }
        if (user.status !== 'Active') {
            throw ApiErrors.StatusError('Ваш аккаунт заблокирован')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)

        if (!isPassEquals) {
            throw ApiErrors.BadRequest('Пароль не совпадает.')
        }
        user.lastLoginDate = new Date()
        await user.save()
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return { tokens, user: userDto }

    }

    async logout(refreshToken) {
        return TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiErrors.UnauthorizedError()
        }

        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiErrors.UnauthorizedError()
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return { tokens, user: userDto }
    }

    async getAllUsers() {
        return User.find()

    }

    async modifyStatus(userID, status) {
        if (!['Active', 'Block', 'Delete'].includes(status)){
            throw ApiErrors.BadRequest('Неизвестный статус.')
        }
        const user = await User.findById(userID)
        if(!user) {
            throw ApiErrors.BadRequest('Неверный ID пользователя.')
        }
        if (status !== 'Delete'){
            user.status = status
            await user.save()
        }
        else {
            await User.findByIdAndDelete(userID)
            await TokenModel.findOneAndDelete({user: userID})
        }
    }
}

module.exports = new UserService()