//Importado de dependencia Router y el Middleware "ValidateJWT"
const router = require('express').Router();
const validateJWT = require('../middlewares/validar-jwt')
//Importación desestructurada del controlador de tareas
const {
    getTasks,
    getTask_idUser,
    postTask,
    putTask,
    deleteTask
} = require('../controllers/task.controllers');

//Ruta getTasks
router.get('/task',getTasks);

//Ruta getTask por IdUser
router.get('/task/user/',[validateJWT],getTask_idUser);

//Ruta postTask
router.post('/task',[validateJWT],postTask);

//Ruta putTask
router.put('/task/:idTask',[validateJWT],putTask);

//Ruta deleteTask
router.delete('/task/:idTask',[validateJWT],deleteTask);

module.exports = router;