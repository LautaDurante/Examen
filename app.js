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

//Middlewares
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

//importacion de Rutas
app.use(require('./src/routes/auth.routes'));
app.use(require('./src/routes/user.routes'));
app.use(require('./src/routes/task.routes'));

//Inicio del Servidor
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
