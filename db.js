'use strict';

const { saveProducts } = require('./catalogue');

//Nano
const db = require('nano')('http://alfa:alfa@127.0.0.1:5984').db;
const dbName = 'customers';
const baseName = 'catalogue';


//FUNKTIONEN

exports.initBase = () => {
    db.list().then(
        res => {
            if (!res.includes(baseName)) db.create(baseName);
            else console.log('Ooups')
        }

    ).then(
        () => console.log('Base ist bereit!')

    ).then(
        saveProducts()
    )
}


exports.loadCustomers = () => {
    const customerDB = db.use(dbName);
    return customerDB.list({ incluse_docs: true }).then(
        data => data.rows.map(row => row.doc)
    ).then(
        data => data.filter((doc => !(doc._id.startsWith('_design'))))
    )
}

exports.saveCustomer = () => {
    const customerDB = db.use(dbName);
    return customerDB.insert()
}

exports.init = () => {
    db.list().then(
        res => {
            if (!res.includes(dbName)) db.create(dbName);
            else return true
        }

    ).then(
        () => console.log('Datenbank ist bereit!')

    )
}


