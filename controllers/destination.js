'use strict';


var Destination = require('../models/destination');


module.exports = function (app) {


    // var model = new Destination();
   

    /**
     * Retrieve a list of all destinations for editing.
     */
    app.get('/destinations', function (req, res) {

        Destination.find(function (err, dest) {
            if (err) {
                console.log(err);
            }

            var model =
            {
                destinations: dest
            };
            console.dir(model);
            res.render('destinations', model);
        });

    });


    app.get('/adddestination', function (req, res) {

       res.render('adddestination', null);

    });

    /**
     *  Edit a destination
     */

     app.get('/destination/:destinationId', function (req, res) {

        Destination.findOne({_id: req.params.destinationId}, function (err, obj) {
            if (err) {
                console.log(err);
            }

            var model =
            {
                destination: obj
            };
            console.dir(model);
            res.render('destination', model);
        });        
        
    });


    /**
     * Add a new destination to the database.
     * **** PLEASE READ THE COMMENT BELOW! ****
     */
    app.post('/destination', function (req, res) {

        var name = req.body.name && req.body.name.trim(),
            desc = req.body.desc && req.body.desc.trim(),
            title = req.body.title && req.body.title.trim(),
            location = req.body.location && req.body.location.trim(),
            photoUrl = req.body.photoUrl && req.body.photoUrl.trim();


        var newDestination = new Destination(
            {
                name: name, 
                desc: desc,
                title: title,
                location: location,
                photoUrl: photoUrl
            });
        
        newDestination.save();


        res.redirect('/destinations');
    });

    /**
     * Delete a destination.
     * @paaram: req.body.item_id Is the unique id of the destination to remove.
     */
    app.delete('/destination/:id', function (req, res) {
        Destination.remove({_id: req.body.item_id}, function (err) {
            if (err) {
                console.log('Remove error: ', err);
            }
            res.redirect('/destinations');
        });
    });


    /**
     * Edit a destination.
     * Not implemented here
     */
    app.put('/destination/:id', function (req, res) {
        console.log('PUT received. Ignoring.');
        res.redirect('/destinations');
    });

};