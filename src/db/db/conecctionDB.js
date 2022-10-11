//Importado de mongoose
const mongoose = require('mongoose');
const dbConnect = require('../../db/connectionDB');

const dbConnect= async () => {
    try {
        await mongoose.connect(procces.env.URI_MONGO)
        console.log('Base de Datos conectada')
    } catch (error) {
        console.log('Error al conectar la Base de Datos');
        console.log(error.message);
    }
}
    
module.exports = dbConnect;