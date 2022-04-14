'use strict';

const { initBase, loadProducts } = require('./catalogue');
const { saveCustomer } = require('./db');

//Express/CouchDB/Formidable
const express = require('express');
const server = express();

server.use(express.static('public', {
    extensions: ['html']
}));

server.use(express.json());

const db = require('./db');
const formidable = require('formidable');

//ROUTEN

let items = [];

server.post('/form_upload', (req, res) => {
    const form = formidable(req);

    form.parse(req, (err, felder, dateien) => {
        if (err) console.log(err);
        else {
            console.log(felder);
            db.saveCustomer(felder).then(
                () => res.send('Daten gesichert!')
            );
        };
    })

})


/*server.get('load_customers', (req, res) => {
    loadCustomers().then(
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



//INIT
const init = async () => {
    await initBase();
    db.init();
    items = await loadProducts();

    server.get('/suggest', (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
            items.map((item, index) => ({ item, index })).filter(value => {
                //console.log(value);
                return value.item[0].includes(req.query.q)
            })
        ))
    });

    server.listen(80, err => console.log(err || 'Server läuft'));
}

init();

//Codezucker: await ersetzt im Code das .then()
//damit der Befehl ausgeführt wird, muss in der umschließenden Funktion async eingetragen sein