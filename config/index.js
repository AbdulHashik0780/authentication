require('dotenv-flow').config();

module.exports = {
    env: process.env.NODE_ENV || 'development',
    server: {
        PORT: process.env.PORT || 6000,
    },
    secretKey: process.env.secret_key,
    database: {
        dbURI: process.env.dbURI,
        poolSize: process.env.poolSize,
        useNewUrlParser: process.env.useNewUrlParser,
        useCreateIndex: process.env.useCreateIndex,
        useUnifiedTopology: process.env.useUnifiedTopology,
        useFindAndModify: process.env.useFindAndModify,
        socketTimeoutMS: process.env.socketTimeoutMS,
        connectTimeoutMS: process.env.connectTimeoutMS,
    },
};
