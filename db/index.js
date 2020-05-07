const mongoose = require('mongoose');
const { connect, connection } = mongoose;
const { database: { dbURI, ...options } } = require('../config');

connect(dbURI, { ...options });

// mongoose.set('debug', true);
// CONNECTION EVENTS
connection.on('connected', () => console.log(`Database Successfully Connected to ${dbURI}`));

connection.on('error', err => console.log(`Database connection error: ${err}`));

connection.on('disconnected', () => console.log('Database connection disconnected'));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    connection.close(() => {
        console.log('Database connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = connection;
