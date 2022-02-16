const express = require('express')
const mongoose = require('mongoose')
const router = require("./server/routes/main.routes.js")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const ErrorsMiddleware = require('./server/middlewares/errors.middleware.js')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({credentials:true, origin: '/'}))
app.use('/api', router)
app.use(ErrorsMiddleware)

const PORT = process.env.PORT
const db_connect = process.env.DB_CONNECT

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}


const start = async () => {
    try{
        app.listen(PORT, ()=> console.log("server started on port " + PORT))
        await mongoose.connect(db_connect)
    }
    catch(err){
        console.log(err)
    }
}

start()