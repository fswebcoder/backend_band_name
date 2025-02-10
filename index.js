const express =  require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));



server.listen(process.env.PORT, (error) => {    
    if (error) {
        throw new Error('Something went wrong', error);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
}); 