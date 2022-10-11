//Importado de mongoose
const mongoose = require('mongoose');

const dbConnect= async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB)
        console.log('Base de Datos conectada')
    } catch (error) {
        console.log('Error al conectar la Base de Datos');
        console.log(error.message);
    }
}
    
module.exports = dbConnect;