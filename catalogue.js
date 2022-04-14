'use strict';

//Nano
const db = require('nano')('http://alfa:alfa@127.0.0.1:5984').db;
const baseName = 'catalogue';

const products = [
    {
        id: 1,
        name: 'Pink passion',
        price: 22,
    }, {
        id: 2,
        name: 'Blue Lagoon',
        price: 22,
    }, {
        id: 3,
        name: 'Classic chic',
        price: 24,
    }, {
        id: 4,
        name: 'Dark night',
        price: 27,
    }, {
        id: 5,
        name: 'Dancing queen',
        price: 28,
    }, {
        id: 6,
        name: 'Party princess',
        price: 32,
    },
    {
        id: 7,
        name: 'Blue hole',
        price: 34,
    }
];


const saveProducts = () => {
    let catalogueDB = db.use(baseName);
    products.forEach(el => { return catalogueDB.insert(el) })
}

exports.loadProducts = () => {
    const catalogueDB = db.use(baseName);
    return catalogueDB.list({ include_docs: true }).then(
        data => data.rows.map(row => [row.doc.name, row.doc.price])
    )
}


exports.initBase = () => {

    db.list().then(
        res => {
            if (!res.includes(baseName)) {
                db.create(baseName).then(
                    saveProducts
                );
                console.log('catalogueDB created!');
            }
            else {
                console.log('.. and filled!')
            }
        })
}



