'use strict';

var StorageInterface = require('./storageInterface');
// var storage = new StorageInterface(null, 'testOne.json', null);
var storage = new StorageInterface();

module.exports = (function () {
    return {
        createUpdate: function (req, res) {
            // incoming data
            let reqData = req.body; 
            
            let r = storage.addElement(reqData.elData);
            if(r)
                res.json({msg:"ok" });
            else
                res.json({msg:"error in adding element" });
        },
        swap: function (req, res) {
            console.log(req.params);
            res.json({msg:"Not Implemented" });
        },
        del: function (req, res) {
            // incoming data
            let reqData = req.body; 
            
            let r = storage.rmElement(reqData.elData);
            if(r)
                res.json({msg:"ok" });
            else
                res.json({msg:"error in adding element" });
        },
        rawJson: function (req, res) {
            console.log('rawFile req.......');
            // res.json({msg:"Not Implemented" });
            res.json(storage.getRawFile());
            console.log('...Done!');
        },
    }
})();