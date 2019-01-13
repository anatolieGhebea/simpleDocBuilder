'use strict';

var StorageInterface = require('./storageInterface');
// var fileStorage = require('./storageInterface')('file');

// var storage = new StorageInterface(null, 'testOne.json', null);
// var storage = new StorageInterface();



// function Controller(fname,withWS, wsPort){
function Controller(fname){
    // this.withWS = withWS || false;
    // this.wsPort = wsPort || '8180';
    this.fname = fname || null;

    this.storage = new StorageInterface(fname);


    // if(withWS){
    //     var socketio = require('socket.io');
    //     this.socket = socketio.listen('8180');

    //     this.wsClient = null;
    //     this.socket.on('connection', function(client){
    //         console.log('socket connection');
    //         client.emit('message', "hello from server");

    //         this.wsClient = client;

    //         this.wsClient.on('pingServer', function(data){
    //             console.log(data); 
    //         });

    //     });
    // }

}


Controller.prototype.edit = function(req, res){
    console.log('\n Call to edit endpoint \n');

    let io = req.app.get('io');
    let sockCl = req.app.get('iocl');

    sockCl.emit('message', 'editfile' + this.fname);
    let room = 'edit_'+this.fname;
    sockCl.join(room);

    io.sockets.in(room).emit('message', 'new user in room: '+room);

    // add or update element in the file
    sockCl.on('getFileData', (data, ackFn) =>{
        console.log(data);
        let f = this.storage.getRawFile()
        if(f){
            ackFn({msg:"ok", data:f});
        }else{   
            ackFn({msg:"error "});
        }
    });

    // add or update element in the file
    sockCl.on('createUpdate', (data, ackFn) =>{
        
        let r = this.storage.addElement(data.elData);
        if(r){
            // sockCl.emit('createUpdate', {msg:'ok'});
            // io.sockets.in(room).emit('elementChangedEvent', {update: true});
            sockCl.broadcast.to(room).emit('elementChangedEvent', {update: true});
            ackFn({msg:"ok"});
        }else{   
            ackFn({msg:"error "});
        }
    });

    // remove elements from file
    sockCl.on('removeElement', (data, ackFn) =>{
        console.log(data);
        let r = this.storage.rmElement(data.elData);
        if(r){
            // sockCl.emit('createUpdate', {msg:'ok'});
            // io.sockets.in(room).emit('elementChangedEvent', {update: true});
            sockCl.broadcast.to(room).emit('elementChangedEvent', {update: true});
            ackFn({msg:"ok"});
        }else{
            ackFn({msg:"error "});
        }
    });

    // send data to client
    this.rawJson(req, res);

    return;
}

// over http connection
Controller.prototype.rawJson = function(req, res){

    let f = this.storage.getRawFile()

    if(f){
        res.json(f);
    }else{
        res.json({msg:"error in getting the file"});
    }

    return;
}

module.exports = Controller;