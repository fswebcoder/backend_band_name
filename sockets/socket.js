const { io } = require('../index'); // Importa la propiedad io correctamente
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon jovi'));
bands.addBand(new Band('Metallica'));
console.log('Init server');
console.log(bands); 

io.on('connection', (client) => {

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', (message) => {
        console.log('Client disconnected', message);
    });

    client.on('mensaje', (payload) => {
        console.log('Message received', payload);
        io.emit('mensaje', {message: 'Hello from the server,now'});
    });

    client.on('emitir-mensaje', (payload) => {
        console.log('Message received', payload);
        io.emit('nuevo-mensaje', payload);
    });

    client.on('register-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('vote-band', (id) => {
        bands.voteBand(id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (id) => {
        bands.deleteBand(id);
        io.emit('active-bands', bands.getBands());
    });
});