//Importado de las dependencias Router, Middlewares: isAdmin y validateJWT
const router = require('express').Router();
const isAdmin = require('../middlewares/is-admin');
const validateJWT = require('../middlewares/validar-jwt');

//Importado Desestructurado del controlador de User
const {
    getUsers,
    getUserID,
    postUser,
    putUser,
    deleteUser,
} = require('../controllers/user.controllers');

//Ruta GetUsers
router.get('/user',[validateJWT,isAdmin],getUsers);//Para obtener todos los usuarios

//Ruta GetUserID
router.get('/user/:idUser',[validateJWT],getUserID);//Para obtener un usuario por ID

//Ruta PostUser
router.post('/user',postUser);//Creo un usuario

//Ruta PutUser
router.put('/user/:idUser',[validateJWT],putUser);//Modifico un usuario

//Ruta DeleteUser
router.delete('/user/:idUser',[validateJWT],deleteUser);//Elimino un usuario

module.exports = router;