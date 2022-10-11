//Importacion de las librerías

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

//Importacion para la conexion a la BD
const dbConnect = require('./db/connectionDB');
dbConnect()

//Se inicializa express
const app = epress();
//sus configuraciones
const port = process.env.PORT;

//Middlewares
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

//importacion de Rutas

//Inicio del Servidor
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
