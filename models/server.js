const express = require('express'),
    cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Conectar a la base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();
    };

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio de archivo public
        this.app.use(express.static('public'));


    };

    routes() {

        this.app.use(this.usersPath, require('../routes/user.routes'));

    };

    start() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo el servidor en puerto http://localhost:${this.port}`);
        });
    };

};



module.exports = Server;