'use strict';

//Nano
const db = require('nano')('http://alfa:alfa@127.0.0.1:5984').db;
const dbName = 'customers';

exports.saveCustomer = () => {
    const customerDB = db.use(dbName);
    return customerDB.insert()
}

exports.init = () => {
    db.list().then(
        res => {
            if (!res.includes(dbName)) db.create(dbName);
            else return true}

    ).then(
        () => console.log('Datenbank ist bereit!')
         
    )
}