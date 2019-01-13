'use strict';

// var controller = require('./controller.js');
var Controller = require('./wsController.js');


module.exports = function(app){
    
    app.get('/edit/:docID', function(req, res){
        let fname = req.params.docID+'.json';

        let wsController = new Controller(fname, true);
        
        wsController.edit(req, res);
        // let wsController = new ()
        // wsController.edit(req, res);
    });

    app.get('/rawJson/:docID', function(req, res){
        let fname = req.params.docID+'.json';

        let wsController = new Controller(fname);
        
        wsController.rawJson(req, res);

    });
}