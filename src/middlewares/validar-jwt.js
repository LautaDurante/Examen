//Importado del modelo de Usuario
const UserModel = require('../models/Users');
//Importado del JWT para verificarlos
const jwt = require('jsonwebtoken');

//Fn para validarJWT
const validarJWT = async (req, res, next) => {
    let token = req.headers.authorization;

    /* verificar si existe el token en una solicitud */
    if(!token){
        return res.status(401).json({
            msg: 'Error de autenticación - no hay token en la petición'
        })
    };//Devuelve en caso de no recibir el token

    try {
        /* Se obtiene idUser, si fue validado */
        const {userID} = await jwt.verify(token, process.env.SECRET);
        /* busca el usuario en la base de datos para saber si pertenece al sistema */
        const Usuario = await UserModel.findById(userID);
        /* Si no exites, tirar el error */
        if(!Usuario) {
            return res.status(401).json({
                error: 'Token no válido - el usuario no existe en la DB'
            })
        };//Devuelve en caso de que el usuario no existe en la DB
        /* verifica si el usuario es Activo */
        if (!Usuario.isActive) {
            return res.status(401).json({
                message: 'Token no válido - el usuario no está activo'
            })
        };//Devuelve en caso de que el usuario con estado false
        req.user = Usuario;

        /* si cumple todo lo anterior, la conssulta sigue */
        next();//En caso exitoso sigue con la ejecución
    } catch (error) {
        console.log(error.message);
        res.status(401).json(
            {
                msg: ' Error de autenticación - Token no válido'
            }
        )//Token no válido
    }
}

module.exports = validarJWT