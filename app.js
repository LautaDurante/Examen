//Importacion de las librerías

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//Importacion para la conexion a la BD
const dbConnect = require('./db/connectionDB');
