const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')


// middlewares
app.use(cors({origin:'*'}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


const admin = require('./routes/admin')
const categoria = require('./routes/categoria')

//URI o Endpoint
app.use('/api/admins', admin)
app.use('/api/categorias', categoria)



module.exports = app

