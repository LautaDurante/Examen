//Importacion de las librerías

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

//Importacion para la conexion a la BD
const dbConnect = require('./src/db/connectionDB');
dbConnect()

//Se inicializa express
const app = express();
//sus configuraciones
const port = process.env.PORT;

//Middlewares ayudan para que mi aplicacion tenga un formato
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

//importacion de Rutas
app.use(require('./src/routes/user.routes'))// rutas del usuario
app.use(require('./src/routes/auth.routes'))// rutas de login 
app.use(require('./src/routes/task.routes'))// rutas del tareas

//Inicio del Servidor
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
