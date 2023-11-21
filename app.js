const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const usuario = require('./routes/usuario');
const producto = require('./routes/producto');
const venta = require('./routes/venta');

// middlewares
app.use(cors({origin:'*'}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/usuarios', usuario);
app.use('/api/ventas', venta);
app.use('/api/productos', producto);

const admin = require('./routes/admin')
const categoria = require('./routes/categoria')

//URI o Endpoint
app.use('/api/admins', admin)
app.use('/api/categorias', categoria)



module.exports = app

