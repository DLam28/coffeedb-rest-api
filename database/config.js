const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        const conn = mongoose.connection;
        mongoose.connection.once('open', () => { console.log('Mongo Atlas Connected'); });
        mongoose.connection.on('eirrir', (err) => { console.log('Mongo Atlas error' + err); });


    } catch (error) {
        console.log(error);
        throw new Error('Error in the connection to database.');
    }


}




module.exports = {
    dbConnection
}