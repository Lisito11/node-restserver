const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Database Online...');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error at starting database...');
    }
}



module.exports = {
    dbConnection
}