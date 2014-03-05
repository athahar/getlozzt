
'use strict';

var mongoose = require('mongoose');

var destinationModel = function () {

    //Define a super simple schema for our destinations.
    var destinationSchema = mongoose.Schema({
        name: String, 
        desc: String,
        title: String,
        location: String,
        photoUrl: String    
    });

    // //Verbose toString method
    // destinationSchema.methods.whatAmI = function () {
    //     var greeting = this.name ?
    //         'Hello, I\'m a ' + this.name + ' and I\'m worth $' + this.price
    //         : 'I don\'t have a name :(';
    //     console.log(greeting);
    // };

    // //Format the price of the destination to show a dollar sign, and two decimal places
    // destinationSchema.methods.prettyPrice = function () {
    //     return '$' + this.price.toFixed(2);
    // };

    return mongoose.model('destination', destinationSchema);

};

module.exports = new destinationModel();