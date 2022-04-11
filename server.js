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
let prices = [];


/*server.get('/load_products', (req, res) => {
    loadProducts().then(
        data => res.send(JSON.stringify(data))
    ).catch(
        err => {
            console.log(err);
            res.send(JSON.stringify({
                status: 'err',
                err
            }))
        }
    )
})*/


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
   
    server.get('/suggest', (req, res, next) => {
        console.log(req.query);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(items.filter(value => value.includes(req.query.q))));
    });
    prices = await loadPrices();

    server.listen(80, err => console.log(err || 'Server läuft'));
}

init();

//await ersetzt im Code das .then()
//damit der Befehl ausgeführt wird, muss in der umschließenden Funktion async eingetragen sein