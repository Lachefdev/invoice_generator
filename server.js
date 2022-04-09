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

//Formidable
const formidable = require('formidable');

//ROUTEN

server.get('.upload', (req, res) => {
    db.loadCustomers().then(
        console.log
    ).catch(
        err => {
            console.log(err);
            res.send(JSON.stringify({
                status: 'err',
                err
            }))
        }
    )
})

server.post('/upload', (req, res) => {
    const form = formidable(req);

    form.parse(req, (err, felder, dateien) => {
        if (err) console.log(err);
        else {
            console.log(felder);
            console.log(dateien);
        };
    })
})

server.post('/save_customer', (req, res) => {
    db.saveCustomer(req.body).then(
        () => res.send('Daten gesichert!')
        );
})


//INIT
const init = () => {

    db.initBase();
    db.init();
    server.listen(80, err => console.log(err || 'Server läuft'));
}

init();