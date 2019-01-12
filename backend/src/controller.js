'use strict';

var StorageInterface = require('./storageInterface');
var fileStorage = require('./storageInterface')('file');

// var storage = new StorageInterface(null, 'testOne.json', null);
// var storage = new StorageInterface();

//@todo review this file
module.exports = (function () {
    return {
        getStorage(storageType, fileName, filePath){            
            return new StorageInterface(storageType); //, fileName, filePath);
        },
        createUpdate: function (req, res) {
            // incoming data
            let fname = req.params.docID+'.json';
            let storage = this.getStorage(null, fname);
            
            let reqData = req.body; 
            
            let r = storage.addElement(reqData.elData, fname);
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
            let fname = req.params.docID+'.json';
            let storage = this.getStorage(null, fname);

            let reqData = req.body; 
            
            let r = storage.rmElement(reqData.elData);
            if(r)
                res.json({msg:"ok" });
            else
                res.json({msg:"error in adding element" });
        },
        rawJson: function (req, res) {
            
            let fname = req.params.docID+'.json';

            if(fname !== undefined){
                let storage = this.getStorage(null, fname);
                res.json(storage.getRawFile());
            }else
                res.json({msg:"error in adding element" });

            // res.json({msg:"Not Implemented" });
            console.log('...Done!');
        },
    }
})();