'use strict';

const { initBase, loadProducts, loadPrices } = require('./catalogue');

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

let items = [];


server.get('.upload', (req, res) => {
    loadCustomers().then(
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
const init = async () => {
    await initBase();
    db.init();
    items = await loadProducts();
    //console.log(items);
   
    server.get('/suggest', (req, res, next) => {
        //console.log(req.query);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
            items.map((item, index) => ({item, index})).filter(value => {
                //console.log(value);
                return value.item[0].includes(req.query.q)
            })
        ))
    });

    server.listen(80, err => console.log(err || 'Server läuft'));
}

init();

//await ersetzt im Code das .then()
//damit der Befehl ausgeführt wird, muss in der umschließenden Funktion async eingetragen sein