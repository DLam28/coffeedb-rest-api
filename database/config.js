const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`Connected to the ${process.env.DATABASE_NAME} database`);


    } catch (error) {
        console.log(error);
        throw new Error('Error in the connection to database.');
    }


}




module.exports = {
    dbConnection
}