const express = require('express');
const morgan = require('morgan'); // logger for incoming request
const helmet = require('helmet'); // header sercurity
const cors = require('cors'); // any origin can request to our backed
const mongoose = require('mongoose');

require('dotenv').config();


const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN, //only this addess will be listen to request
}));
app.use(express.json());

app.get('/', (req, res) => {{
    res.json({
        message: 'hello world',
    });
}});

app.use('/api/logs', logs);

//Not found handler midleware
app.use(middlewares.notFound);

//Error handler midleware
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});