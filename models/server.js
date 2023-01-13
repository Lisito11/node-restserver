const express = require('express');
const cors = require('cors');
class Server{
    constructor(){
         this.app = express();
         this.port = process.env.PORT;
         this.usersPath = '/api/users';

         //Middlewares
         this.middlewares();
         //Routes
         this.routes();

    }

    middlewares(){
        //Cors
        this.app.use(cors());

        // Read and Parse body
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

module.exports = Server;