const mongoose = require("mongoose");

const dbConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        conn = mongoose.connection;

        conn.on("error", (err) => {
            console.log("Cannot established connection to database: " + err);
        });

        conn.once("open", () => {
            console.log("|Mongo Atlas| Connected to database");
        });
    } catch (error) {
        console.log(error);
        throw new Error("Error in the connection to database.");
    }
};

module.exports = {
    dbConnection,
};
