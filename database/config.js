const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        const conn = mongoose.connection;
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .catch((err) => console.log(`There is an error in dbConnection ${err}`))
            .finally('Connection established succesfully');

        conn.on('error', (err) => { console.log('Mongo Atlas error' + err); });
        conn.once('open', () => { console.log('Connected to database'); });


    } catch (error) {
        console.log(error);
        throw new Error('Error in the connection to database.');
    }


}




module.exports = {
    dbConnection
}