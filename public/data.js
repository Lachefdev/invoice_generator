'use strict';

//GLOBALE VARIABLEN/KONSTANTEN

class Customer {
    constructor({
        recipientName, 
        recipientLastName, 
        recipientRoad, 
        recipientHouseNumber,
        recipientZipCode,
        recipientCity,

        customerId,
        invoiceId,
        invoiceDate,
        invoiceTotal,
        invoiceDue
        
    }) {
        this.name = recipientName;
        this.lastName = recipientLastName;
        this.road = recipientRoad;
        this.houseNumber = recipientHouseNumber;
        this.zipCode = recipientZipCode;
        this.city = recipientCity;

        this.id = customerId;
        this.invoice = [invoiceId];
        this.date = [invoiceDate];
        this.total = [invoiceTotal];
        this.due = [invoiceDue];
    }
};

let recipientName = $('#recipient-name').value;
let recipientLastName = $('#recipient-last-name').value;
let recipientRoad = $('#recipient-road').value;
let recipientHouseNumber = $('#recipient-house-number').value;
let recipientZipCode = $('#recipient-zip-code').value;
let recipientCity = $('#recipient-city').value;

let customerId = $('.customer-id').value;
let invoiceId = $('.invoice-id').value;
let invoiceDate = $('.invoice-date').value;
let invoiceTotal = $('.total-amount').value;
let invoiceDue = $('.due-date').value;


//FUNKTIONEN
const $ = selector => {
    return document.querySelector(selector)
} 
