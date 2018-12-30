'use strict';

var path = require('path')
var os = require('os')
var fs = require('fs')

// default varaibles
// var storageType = 'local';
// var fileName = 'test.josn';

function StorageInterface(storageType, fileName, filePath){
    this.type = storageType || 'local';
    this.fileName = fileName || 'test.json';
    this.filePath = filePath || path.join(__dirname, '../inAppStorage');
    this.workingFile = this.filePath+'/'+ this.fileName;

    console.log('loading storage with type:'+this.type+' path:'+this.filePath+' file:'+this.fileName);
    this.createBaseFile();
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
            "docTitle":'test file',
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
    return ok;
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
        elements = fileData.elements;
    }

    // add element to array
    if(elements !== null ){
        //@TODO do some checking before adding elements

        let elIndex = this.elPosition(elements, elData.id);

        //if element exists, override
        if(elIndex !== false)
            elements[elIndex] = elData;
        else
            // element doesn't exist, add 
            elements.push(elData);

        // rewrite to file
        fileData.elements = elements;
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
        elements = fileData.elements;

        let elPos = this.elPosition(elements, elData.id);

        if(elPos !== false){
            
            let childsIndex = this.childIndexes(elements, elData.id);
            console.log(childsIndex);

            // if no childs found, skip the following code
            if(typeof childsIndex !== 'null' && typeof childsIndex !== 'undefined' && childsIndex.length > 0 ){
                // indexes must be in desc order 7,6,3,2,... 
                // because elements.splice(idx, 1) will cause array to be shorter 
                // shifting all elements to left causing index missmatch 
                // by descending order we are simulating a pop function in array
                function sortNumber(a,b) {
                    return b - a;
                }
                childsIndex.sort(sortNumber);

                // remove childs
                childsIndex.forEach(idx =>{
                    // just to be sure that index is a positive number
                    if(idx > -1){
                        console.log('rm :'+idx);
                        elements.splice(idx, 1);
                    }
                });

            }

            // finally remove the intended element 
            elements.splice(elPos, 1)
                        
            // rewrite to file
            fileData.elements = elements;
            try{
                fs.writeFileSync(this.workingFile, JSON.stringify(fileData));    
            }catch (e){
                console.log("Cannot write file ", e);
                ok = false;
            }
        }else{
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
StorageInterface.prototype.elPosition = function(elements, elId) {
    var index = false;
    elements.forEach((element, i) => {        
        if(element.id == elId){
            index = i;
        }
    });
    return index;
}
/**
 * Returns element index or false (if element doesn't exist)
 */
StorageInterface.prototype.childIndexes = function(elements, parentId, indexes) {
    var indexes = indexes || [];

    elements.forEach((element, i) => {
        if(element.parentId == parentId){
            
            // this el is child of the element being removed, 
            // add his index to the list of the elements to remove
            // than check if has childs
            indexes.push(i);
            indexes = this.childIndexes(elements, element.id, indexes);
        }
    });

    return indexes;
}

module.exports = StorageInterface;