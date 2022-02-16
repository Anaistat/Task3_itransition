const {Schema, model} =require("mongoose");

const user = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: false
    },
    registrationDate: {
        type: Date,
        required: true,
        unique: false,
        default: new Date()
    },
    lastLoginDate: {
        type: Date,
        required: true,
        unique: false,
        default: new Date()
    },
    status: {
        type: String,
        required: true,
        unique: false,
        default: "Active"
    }
})
module.exports = model('User', user)
