const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .catch((err) => console.log(`An error ocurred! : ${err}`));

        const conn = mongoose.connection;
        conn.on('error', (err) => { console.log('Mongo Atlas error' + err); });
        conn.once('open', () => { console.log('Mongo Atlas Connected'); });


    } catch (error) {
        console.log(error);
        throw new Error('Error in the connection to database.');
    }


}




module.exports = {
    dbConnection
}