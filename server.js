'use strict';

//Express
const express = require('express');
const server = express();

server.use(express.static('public', {
    extensions: ['html']
}));

server.use(express.json());

//CouchDB
const db = require('./db');


//INIT
const init = () => {

    db.init();
    server.listen(80, err => console.log(err || 'Server läuft'));
}

init();