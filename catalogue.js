'use strict';

//Nano
const db = require('nano')('http://alfa:alfa@127.0.0.1:5984').db;
const baseName = 'catalogue';

const products = [
    {
        id: 1,
        name: 'Pink passion',
        //description: 'A rubber band necklace called pink passion. With a teardrop shaped pendant in pink.',
        price: 22,
        //img: 'drop_pink.jpg'
    }, {
        id: 2,
        name: 'Blue Lagoon',
        //description: 'A rubber band necklace called blue lagoon. With a teardrop shaped pendant in blue.',
        price: 22,
        //img: 'drop_blue_2.jpg'
    }, {
        id: 3,
        name: 'Classic chic',
        //description: 'A rubber band necklace called classic chic. With a rectangular pendant in pink.',
        price: 24,
        //img: 'rectangle_pink.jpg'
    }, {
        id: 4,
        name: 'Dark night',
        //description: 'A necklace out of metal with a screw top AND a dark, round pendant.',
        price: 27,
        //img: 'round_black_3.jpg'
    }, {
        id: 5,
        name: 'Dancing queen',
        //description: 'A necklace out of metal with a screw top AND a rectangular pendant in esmerald green.',
        price: 28,
        //img: 'rectangle_green.jpg'
    }, {
        id: 6,
        name: 'Party princess',
        //description: 'A necklace out of metal with a screw top AND a purple pendant in the form of a diamond.',
        price: 32,
        //img: 'diamond_purple_4.jpg'
    }
];

//console.log(products[0].id);
//const product = products[0];


const saveProducts = () => {
    let catalogueDB = db.use(baseName);
    products.forEach(el => {return catalogueDB.insert(el)})
}


exports.initBase = () => {
    db.list().then(
        res => {
            if (!res.includes(baseName)) db.create(baseName);
            else true
        }

    ).then(
        () => console.log('Base ist bereit!')

    ).then(
        saveProducts()
    )
}


