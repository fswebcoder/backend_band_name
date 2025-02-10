const { io } = require('../index'); // Importa la propiedad io correctamente

io.on('connection', (client) => {
    console.log('Client connected', client.id);

    client.on('disconnect', (message) => {
        console.log('Client disconnected', message);
    });

    client.on('mensaje', (payload) => {
        console.log('Message received', payload);
        io.emit('mensaje', {message: 'Hello from the server,now'});
    });
});