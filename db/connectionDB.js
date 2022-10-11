const mongoose = require('mongoose');

//conexion a la bd
const dbConnect = async () => {
    try {
        mongoose.connect(process.env.URI_MONGODB);
        console.log('Conectado a la Base de Datos');
    }catch (error) {
        console.log('Error al tratar de conectar con la Base de Datos');
        console.log(error.message);
    }
}

module.exports = dbConnect;