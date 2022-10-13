// Importación de las dependencias
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

//Inicializado del Controlador.object
const CtrlUser = {}

//Controlador de GetUsers
CtrlUser.getUsers = async (req,res) => {
    try {
        const usuarios = await Users.find({isActive: true});
        if(!usuarios.length){return res.status(404).json({message:"No se encontró ningún usuario."})}

        return res.json({
            message: `Número de Usuarios encontrados ${usuarios.length}`,
            usuarios
        })
    }   catch(error) {
        return res.status(500).json({message:`No se pudieron encontrar los usuarios: ${error.message}`})
    }
}

//Controlador de GetUser por ID
CtrlUser.getUserID = async (req, res) => {
    try {
        const idUser = req.user._id;
        const user = await Users.findOne({$and:[{"_id":idUser},{isActive:true}]});
        if(!user){
            return res.status(404).json(
                {
                    message:"No se encuentra el usuario"
                }
            )
        }
        if(!( (idUser == req.user._id) || req.user.role === 'user_admin') ){
            return res.status(401).json(
                {
                    message: `No está autorizado para esta petición.`
                }
            )
        }
        return res.json(
            {
                message: `Usuario encontrado`,
                user
            }
        )
    } catch (error) {
        return res.status(500).json({message: `Error interno del Servidor: ${error.message}`})
    }
}
//Controlador de PostUser
CtrlUser.postUser = async (req, res) => {
    try {
        const {username, password,email} = req.body;
        // Encriptando la contraseña de usuario
        const newPassword = bcrypt.hashSync(password,10);//Mecanismo de encriptado de la contraseña

        const newUser = new Users({
            username,
            password: newPassword,
            email
        });
        await newUser.save();
        return res.status(201).json({
            message: `Usuario guardado correctamente.`
        });
    } catch (error) {
        return res.status(500).json({
            message: `Hubo un error con guardar el usuario: ${error.message}`
        })
    }
}
//Controlador de PutUser
CtrlUser.putUser = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const {password,email} = req.body;
        if(!idUser || !password || !email) {
            return res.status(400).json({
                message: `No viene id o información en la petición.`,
                opcionesDeCuerpo:["password","email"]
            })
        }
        const User = await Users.findOne({$and:[{_id: idUser}, {isActive: true}]});
        if(!User){
            return res.status(404).json({
                message: `El usuario no fue encontrado`
            })
        }
        if(!( (idUser == req.user._id) || req.user.role === 'user_admin') ){
            return res.status(401).json(
                {
                    message: `No está autorizado para esta petición.`
                }
            )
        }
        const newPassword = bcrypt.hashSync(password,10)
        await User.updateOne({password:newPassword , email});
        return res.status(201).json({
            message: `Usuario modificado correctamente.`
        })
    } catch (error) {
        return res.status(500).json({
            message: `Hubo un error con modificar el usuario: ${error.message}`
        })
    }
}
//Controlador de DeleteUser
CtrlUser.deleteUser = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const user = await Users.findOne({$and:[{_id: idUser},{isActive: true}]});
        if(!user){
            return res.status(404).json({
                message: `El usuario ya no existe`
            })
        }
        if(!( (idUser == req.user._id) || req.user.role === 'user_admin') ){
            return res.status(401).json(
                {
                    message: `No está autorizado para esta petición.`
                }
            )
        }
        await user.updateOne({isActive: false})
        return res.status(201).json({
            message: `Usuario eliminado correctamente.`
        })
    } catch (error) {
        return res.status(500).json({message:`Error interno del servidor: ${error.message}`})
    }
}
//Export del Controlador
module.exports = CtrlUser;