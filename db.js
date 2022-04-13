'use strict';

const { saveProducts } = require('./catalogue');

//Nano
const db = require('nano')('http://alfa:alfa@127.0.0.1:5984').db;
const dbName = 'customers';
const baseName = 'catalogue';


//FUNKTIONEN

/*exports.loadCustomers = () => {
    const customerDB = db.use(dbName);
    return customerDB.list({ incluse_docs: true }).then(
        data => data.rows.map(row => row.doc)
    ).then(
        data => data.filter((doc => !(doc._id.startsWith('_design'))))
    )
}*/

exports.saveCustomer = (customer) => {
    const customerDB = db.use(dbName);
    return customerDB.insert(customer)
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


