'use strict';

const myForm = document.querySelector('.form');

const customerId = document.querySelector('.customer-id');
const invoice = document.querySelector('.invoice-id');
const invoiceDate = document.querySelector('.invoice-date');
const amount = document.querySelector('.total-amount');
const dueDate = document.querySelector('.due-date');

//FUNKTIONEN

const handleForm = evt => {

    window.print();

    evt.preventDefault();

    return new Promise((resolve, reject) => {
        const formData = new FormData(myForm);
        formData.append('customerId', customerId.innerHTML);
        formData.append('invoice', invoice.innerHTML);
        formData.append('invoiceDate', invoiceDate.innerHTML);
        formData.append('amount', amount.innerHTML);
        formData.append('dueDate', dueDate.innerHTML);

        fetch('/form_upload', {
            method: 'POST',
            body: formData
        }).then(
            res => res.text()
        ).then(
            resolve
        ).catch(
            reject
        )
    });

}


const init = () => {

    myForm.addEventListener('submit', handleForm);

}

init();

