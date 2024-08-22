const express = require("express"),
    cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = "/api/users";
        this.authPath = "/api/auth";

        this.connectDB();

        this.middlewares();

        this.routes();
    }

    connectDB() {
        dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.authPath, require("../routes/auth.routes"));
        this.app.use(this.usersPath, require("../routes/user.routes"));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(
                `Server ready! Listening port in: http://localhost:${this.port}`
            );
        });
    }
}

module.exports = Server;
