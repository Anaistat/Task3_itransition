const ApiErrors = require("../exceptions/api.errors.js");

module.exports = (errors, request, response, next) => {
    console.log(errors)

    if(errors instanceof ApiErrors){
        return response.status(errors.status).json({message: errors.message, errors: errors.errors})
    }
    return response.status(500).json({message: "Unexpected error"})
}