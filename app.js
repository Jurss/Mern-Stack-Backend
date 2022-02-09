const express = require('express');
const mongoose = require('mongoose');

const stuffRouter = require('./routes/stuff');
const app = express();

//n4xCNZSRjn2b7x8
//WvX5LqefVapPGCb

mongoose.connect('mongodb+srv://Jurss:WvX5LqefVapPGCb@cluster0.yjhdl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/stuff', stuffRouter);

module.exports = app;