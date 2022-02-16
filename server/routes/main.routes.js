const { Router } = require("express")
const UserController = require('../controllers/user.controller.js')
const AuthorizationMiddleware = require('../middlewares/authorization.middleware.js')
const { body } = require('express-validator')

const router = Router()

router.post("/registration",
    body('email').isEmail(),
    body('name').exists(),
    body('password').exists(),
    UserController.registration)

router.post("/login",
    body('email').isEmail(),
    body('password').exists(),
    UserController.login)

router.get("/getusers", AuthorizationMiddleware, UserController.getUsers)

router.post("/modifyuserstatus",
    body('id').exists(),
    body('status').exists(),
    AuthorizationMiddleware,
    UserController.modifyUserStatus)

router.post("/logout", AuthorizationMiddleware, UserController.logout)

router.post('/refresh', UserController.refresh)

module.exports = router