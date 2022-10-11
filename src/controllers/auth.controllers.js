//Importacion de modelo usuario
const Users = require('../models/Users');

//Importacion de las dependencias
const generarJWT = require('../helpers/generar-jwt');
const bcrypt = require('bcrypt');
const CtrlAuth = {};


