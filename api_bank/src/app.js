const expressLoader = require('./loaders/expressLoader');
const databaseLoader = require('./loaders/databaseLoader');
const express = require('express');
const app = express();
const verifyTokenMiddleware = require('./middlewares/verifyTokenMiddleware');
const userRoutes = require('./routes/userRoutes');
const operationRoutes = require('./routes/operationRoutes')

expressLoader.init(app);
databaseLoader.init();

app.use('/user',userRoutes);
app.use('/operation',verifyTokenMiddleware.verifyToken,operationRoutes)

module.exports = app;