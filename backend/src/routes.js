'use strict';

var controller = require('./controller.js');

module.exports = function(app){
    // definition of APIs
    app.post('/createUpdate', function(req, res){
        controller.createUpdate(req, res)
        //fabcar.getAllCars(req, res);
    });

    app.post('/delete', function(req, res){
        controller.del(req, res)
        // fabcar.getCarById(req, res);
    });

    app.post('/swap', function(req, res){
        controller.swap(req, res)
        // fabcar.addNewCar(req, res);
    });

    app.get('/rawJson', function(req, res){
        controller.rawJson(req, res)
        // fabcar.changeOwner(req, res);
    });
}