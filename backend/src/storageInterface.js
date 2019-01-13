'use strict';

var path = require('path')
// var os = require('os')
var fs = require('fs')

// default varaibles
// var storageType = 'local';
// var fileName = 'test.josn';

// function StorageInterface(storageType, fileName, filePath){
//     this.type = storageType || 'local';
//     this.fileName = fileName || 'test_tree.json';
//     this.filePath = filePath || path.join(__dirname, '../inAppStorage');
//     this.workingFile = this.filePath+'/'+ this.fileName;

//     console.log('loading storage with type:'+this.type+' path:'+this.filePath+' file:'+this.fileName);
//     this.createBaseFile();
// }
function StorageInterface(fileName, filePath){
    
    this.fileName = fileName || 'test_tree.json';
    this.filePath = filePath || path.join(__dirname, '../inAppStorage');
    this.workingFile = this.filePath+'/'+ this.fileName;

    console.log('loading storage with type:'+this.type+' path:'+this.filePath+' file:'+this.fileName);
    // this.createBaseFile();
}

StorageInterface.prototype.existFile = function(){
  
    try {
        let ok = fs.statSync(this.workingFile).isFile();
        // console.log(ok);
        return ok;
    } catch (error) {
        // console.log(error);
        return false;
    }
}

/**
 * this function creates the fisical file, with the base contente 
 * 
 * @param {bool} override to verride the given file
 * @returns {bool} true|fale returs false only if there were errors in creating the file
 */
StorageInterface.prototype.createBaseFile = function(override){
    var ok = true; 

    if(!this.existFile() || override === true ){
        console.log('creating.....');

        let baseContent = {
            "docTitle":'ex: document title',
            "docVersion":"1.0.0",
            "docLang":"en",
            "elements":[]
        }

        try{
            fs.writeFileSync(this.workingFile, JSON.stringify(baseContent));    
        }catch (e){
            console.log("Cannot write file ", e);
            ok = false;
        }
    }else{
        console.log('file exist, use createFile(true) to override');    
    }

    return {res: ok, msg: "bablblabla"};
    //return ok;
}


StorageInterface.prototype.getRawFile = function() {
    let rawFile = null;

    try {
        rawFile = JSON.parse(fs.readFileSync(this.workingFile));    
    } catch (e) {
        console.log("Cannot read file ", e);
        rawFile = false;
    }

    return rawFile;
}

StorageInterface.prototype.addElement = function(elData) {

    let ok = true;
    //
    // @todo Implement a better way of doing this operations
    //

    // check for valid id
    if(elData.id.indexOf("section") < 0 && elData.id.indexOf("subsection") < 0 && elData.id.indexOf("paragraph") < 0){
        console.log('invalid key: '+elData.id);
        return false;
    }


    // load file 
    let fileData = null;
    let elements = null;

    try{
        fileData = JSON.parse(fs.readFileSync(this.workingFile));
    }catch (e){
        console.log("Cannot read file ", e);
        ok = false;
    }

    if(fileData !== null){
        elements = fileData.pageElements;
    }

    // add element to array
    if(elements !== null ){        
        // split incoming id
        let hierarchy = elData.id.split("-");

        console.log(hierarchy);
        let hl = hierarchy.length;
        if(hl == 1){
            // section is beeing modified, index 'title' is always present
            if(typeof elements[elData.id] === 'undefined' ){
                elements[elData.id] = {"title":elData.cnt};                    
            }else
                elements[elData.id]['title'] = elData.cnt;
        }else if(hl == 2){
            // 2 posibbilities: subsection update or paragraph update
            let key = hierarchy[1];

            if(key.indexOf('subsection') > -1){
                // it's a subsection
                if(typeof elements[hierarchy[0]][elData.id] === 'undefined' ){
                    elements[hierarchy[0]][elData.id] = {"title":elData.cnt};                    
                }else
                    elements[hierarchy[0]][elData.id]['title'] = elData.cnt;
            }else if( key.indexOf('paragraph') > -1){
                // it's a paragraph
                if(typeof elements[hierarchy[0]][elData.id] === 'undefined' ){
                    elements[hierarchy[0]][elData.id] = {"content":elData.cnt};                    
                }else
                    elements[hierarchy[0]][elData.id]['content'] = elData.cnt;  
            }else{
                // error
                ok = false;
            }

        }else if(hl == 3){
            // third level paragraph is beeing updated
            console.log('hey');
            if(typeof elements[hierarchy[0]][hierarchy[0]+'-'+hierarchy[1]][elData.id] === 'undefined' ){
                elements[hierarchy[0]][hierarchy[0]+'-'+hierarchy[1]][elData.id] = {"content":elData.cnt};                    
            }else
                elements[hierarchy[0]][hierarchy[0]+'-'+hierarchy[1]][elData.id]['content'] = elData.cnt;

        }else{
            console.log('invalid key hierarchy');
            ok = false;
        }

        // rewrite to file
        fileData.pageElements = elements;
        try{
            fs.writeFileSync(this.workingFile, JSON.stringify(fileData));    
        }catch (e){
            console.log("Cannot write file ", e);
            ok = false;
        }
    }

    return ok;
}


StorageInterface.prototype.rmElement = function(elData) {

    let ok = true;
    //
    // @todo Implement a better way of doing this operations
    //

    // load file 
    let fileData = null;
    let elements = null;

    try{
        fileData = JSON.parse(fs.readFileSync(this.workingFile));
    }catch (e){
        console.log("Cannot read file ", e);
        ok = false;
    }

    if(fileData !== null){
        elements = fileData.pageElements;

        let hierarchy = elData.id.split("-");
        let hl = hierarchy.length;
        switch (hl) {
            case 1:
                // first leve
                delete elements[elData.id];
                break;
            case 2:
                delete elements[hierarchy[0]][elData.id];
                break;
            case 3:
                delete elements[hierarchy[0]][hierarchy[0]+'-'+hierarchy[1]][elData.id];
                break;
            default:
                console.log('invalid key hierarchy');
                ok = false;
                break;
        }

        // rewrite to file
        fileData.pageElements = elements;
        try{
            fs.writeFileSync(this.workingFile, JSON.stringify(fileData));    
        }catch (e){
            console.log("Cannot write file ", e);
            ok = false;
        }
    }else{
        ok = false;
    }

    return ok;
}

/**
 * Returns element index or false (if element doesn't exist)
 */
StorageInterface.prototype.someFunc = function() {
    //@todo implement
    return false;
}

module.exports = StorageInterface;