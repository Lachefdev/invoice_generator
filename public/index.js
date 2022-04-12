'use strict';

const myForm = document.querySelector('.form');
const btnForm = document.querySelector('.btnCreate');



const loadData = evt => {

    evt.preventDefault();

    return new Promise((resolve, reject) => {
        fetch('/upload', {
            method: 'POST',
            body: new FormData(myForm)
        }).then(
            res => res.text()
        ).then(
            resolve
        ).catch(
            reject
        )
    })
}

const saveData = () => {

}


const init = () => {

    /*loadProducts().then(
        renderProducts
    ).catch(
        console.warn
    );*/

    myForm.addEventListener('submit', loadData);
    btnForm.addEventListener('click', generateInvoice);
    loadData().then(
        saveData
    ).catch(
        console.warn
    )

}

init();

