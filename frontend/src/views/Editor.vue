<template>
    <div class="editor">
    
        <v-container fluid>
        
            <v-layout row >
                <v-flex align-self-center>
                    <h1 class="subheading grey--text">Editor</h1>
                </v-flex>
                <v-flex>
                    <v-btn flat outline color="green" class="right" @click="getData()">
                        <v-icon small left>refresh</v-icon>
                        <span class="caption">Refresh</span>
                    </v-btn>
                    <v-btn flat outline color="green" class="right" @click="pingServer()">
                        <v-icon small left>ping</v-icon>
                        <span class="caption">ping Server</span>
                    </v-btn>
                </v-flex>
            </v-layout>

            <v-card flat>
                <v-layout row wrap>
                    <v-flex sx12 md6 class="pa-2">
                        <v-text-field 
                            v-model="docTitle"
                            label="Document title" 
                            
                        ></v-text-field>
                    </v-flex>
                    <v-flex sx4 md2 class="pa-2">
                        <v-text-field 
                            v-model="docVersion"
                            label="Version"
                            
                        ></v-text-field>
                    </v-flex>
                    <v-flex sx4 md2 class="pa-2">
                        <v-text-field 
                            v-model="docLang"
                            label="Lang"
                            
                        ></v-text-field>
                    </v-flex>
                    <v-flex sx4 md2 class="pa-2">
                        <v-text-field 
                            v-model="lastMod"
                            label="Last Mod"
                            disabled
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-card>


            <v-layout row class="mt-3 edit-col">
                <!-- 3 col configuration -->
                <v-flex md3 class="pa-1 hidden-sm-and-down sideMenu">
                    <v-card flat color="grey lighten-4" class="pa-1">
                    <h2 class="grey--text">Index</h2>
                        
                        <ul>
                            <li v-for="(sec, key) in this.elements" :key="key">
                                <a v-bind:href="'#'+key" >{{ sec.title }} </a>
                                <ul >
                                    <li v-for="(subsec, key1) in  subsecOf(sec)" :key="key1"  >
                                        <a v-bind:href="'#'+key1" >{{ subsec.title }} </a>
                                    </li>
                                </ul>
                            </li> 
                        </ul>

                    </v-card>
                </v-flex>
                <v-flex md6 class="">
                    <!-- <h2 class="grey--text">Content</h2> -->
                    <v-card flat class="pa-2">
                        
                        <!-- loop 1st level in array -->
                        <!-- 
                            structure:
                            section_1 {
                                title: "string",
                                section_1-subsection_1{
                                    title: "string",
                                    section_1-subsection_1-paragraph_1 {
                                        content: "html"
                                    }
                                },
                                section_1-paragraph_1 {
                                    content: "html"
                                }
                            },
                            section_2 {
                                ...
                            },
                            ...
                         -->

                        <v-layout column>
                            <v-flex v-for="(lv1, key ) in elements" :key="key">
                                <div class="pa-1 section">
                                    <h1>
                                        <input 
                                            v-bind:id="key"
                                            v-model="lv1.title"
                                            @blur="updateEl"
                                        />
                                    </h1>

                                    <div v-for="(lv2, key1) in lv1" :key="key1">
                                        <div v-if="isSubSection(key1)">
                                            <!-- subsection found -->
                                            <div class="px-3 subsection">
                                                <h2>
                                                    <input 
                                                        v-bind:id="key1"
                                                        v-model="lv2.title"
                                                        @blur="updateEl"
                                                    />
                                                </h2>
                                                
                                                <div v-for="(lv3, key2) in lv2" :key="key2">
                                                    <div v-if="isParagrph(key2)" class="px-2 paragraph">
                                                        <p>
                                                            <textarea 
                                                                v-bind:id="key2"
                                                                v-model="lv3.content"
                                                                @blur="updateEl"
                                                                @change="auto_grow($event)"
                                                            />
                                                        </p>
                                                        <div class="action-btn">
                                                            <v-spacer></v-spacer>
                                                            <v-btn v-bind:id="key2" small icon class="red--text" @click="rmEl(key2)">
                                                                <v-icon>delete</v-icon>
                                                            </v-btn>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="action-btn">
                                                    <v-btn v-bind:id="key1" small flat class="blue--text" @click="addNewEl(key1, paragraph)">
                                                        <v-icon>add_circle_outline</v-icon>
                                                        <span>paragraph</span>
                                                    </v-btn>
                                                    <v-spacer></v-spacer>
                                                    <v-btn v-bind:id="key1" small icon class="red--text" @click="rmEl(key1)">
                                                        <v-icon>delete</v-icon>
                                                    </v-btn>
                                                </div>

                                            </div>
                                        </div>
                                        <div v-else-if="isParagrph(key1)">
                                            <!-- paragraph found -->
                                            <div class="mt-1 px-1 paragraph"> 
                                                <p> 
                                                    <textarea
                                                        v-bind:id="key1"
                                                        v-model="lv2.content"
                                                        @blur="updateEl"
                                                        @change="auto_grow($event)"
                                                    />
                                                </p>
                                                <div class="action-btn">
                                                    <v-spacer></v-spacer>
                                                    <v-btn v-bind:id="key1"  small  icon  class="red--text" @click="rmEl(key1)">
                                                        <v-icon>delete</v-icon>
                                                    </v-btn>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="action-btn">
                                        <v-btn v-bind:id="key" small flat class="blue--text" @click="addNewEl(key, subsection)">
                                            <v-icon>add</v-icon>
                                            <span>SubSection</span>
                                        </v-btn>
                                        <v-btn v-bind:id="key" small flat class="blue--text" @click="addNewEl(key, paragraph)">
                                            <v-icon>add_circle_outline</v-icon>
                                            <span>paragraph</span>
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn v-bind:id="key" small icon class="red--text" @click="rmEl(key)">
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                    </div>
                                </div>

                                <br/><br/>
                            </v-flex> 
                        </v-layout>

                        <div class="action-btn">
                            <v-btn v-bind:id="rootDoc" small flat class="blue--text" @click="addNewEl(rootDoc, 'p')">
                                <v-icon>add_circle_outline</v-icon>
                                <span>section</span>
                            </v-btn>
                        </div>
                    </v-card>
                </v-flex>
                <v-flex md3 class="px-1 hidden-sm-and-down">
                    <!-- <h2 class="grey--text">comments</h2> -->
                    <v-card flat class="grey lighten-5 pa-1">
                        some conente
                    </v-card>
                </v-flex>

            </v-layout>


            <v-snackbar
                v-model="snackbar"
                bottom
                left
                :timeout="timeout"
                :color="color"
                >
                {{ text }}
                <!-- <v-btn
                    color="pink"
                    flat
                    @click="snackbar = false"
                >
                    Close
                </v-btn> -->
            </v-snackbar>

        </v-container>
    
    </div>
</template>

<script>
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export default {
    data(){
        return {
            //websocket
            // socketInstance: socketio.connect(this.$hostname +':'+this.$hostnameport),
            // socketInstance: new VueSocketIO({ "debug":true, "connection": this.$hostname +':'+this.$hostnameport }),
            sock: null,
            isConnected: false,
            // snackbar
            snackbar: false,
            timeout: 800,
            text: 'snackbar',
            color: 'black',
            // some const 
            subsection: 'subs',
            paragraph: 'p',
            rootDoc: 'rootDocument',
            //
            // baseRoot:"http://localhost:8080",
            baseRoot: this.$hostname +':'+this.$hostnameport,
            docTitle: "",
            docVersion: "",
            docLang: "",
            lastMod: new Date(),
            elements:[]
        }
    },
    methods:{
        getData(){
            /* eslint-disable */    
            // first call to server must be a restApiCall, to init 
            // file editing socket
            console.log(this.$route.params.docID);
            this.$http.get(this.baseRoot+'/edit/'+this.$route.params.docID)
            .then(response =>{
                let res = response.body;
                this.docTitle = res.docTitle;
                this.docVersion = res.docVersion;
                this.docLang = res.docLang;
                this.elements = res.pageElements;

                /* eslint-disable */    
                // console.log(typeof this.elements);
                

            }).catch(error => {
                /* eslint-disable */    
                console.log(error);
            });
        },
        updateData(){
            /* eslint-disable */    

            var self = this;
            this.$socket.emit('getFileData', '', function(resp){
                // if data has not been updated, reload the data to restore 
                // view to previous state
                console.log(resp);
                
                if(resp.msg !== 'ok')
                    console.log('some error in updating file data');
                else{
                    let res = resp.data;
                    self.docTitle = res.docTitle;
                    self.docVersion = res.docVersion;
                    self.docLang = res.docLang;
                    self.elements = res.pageElements;    
                }
                    
                return 'ciao';
            });

            
            // console.log(this.$route.params.docID);
            // this.$http.get(this.baseRoot+'/rawJson/'+this.$route.params.docID)
            // .then(response =>{
            //     let res = response.body;
            //     this.docTitle = res.docTitle;
            //     this.docVersion = res.docVersion;
            //     this.docLang = res.docLang;
            //     this.elements = res.pageElements;

            //     /* eslint-disable */    
            //     // console.log(typeof this.elements);
                

            // }).catch(error => {
            //     /* eslint-disable */    
            //     console.log(error);
            // });
        },
        isSection(key){
            return  key.indexOf('section') > -1 ? true: false;
        },
        isSubSection(key){
            return  key.indexOf('subsection') > -1 ? true: false;
        },
        isParagrph(key){
            return  key.indexOf('paragraph') > -1 ? true: false;
        }, 
        subsecOf(sec){
            let l = {};
            for (var k in sec){
                if(sec.hasOwnProperty(k) && this.isSubSection(k)){
                    l[k]= sec[k];  
                }
            }
            return l;
        },
        updateEl(e){
            // console.log('blur');
            // console.log(e.target.value);
            // console.log(e.target.id);
            
            let sendable = {
                "action": "createUpdate",
                "elData":{
                    "id": e.target.id,
                    "cnt": e.target.value,
                }
            };
            
            this.createUpdate(sendable, 'update');
            return;
        },
        addNewEl(parentKey, elType){
            console.log(parentKey);
            console.log(elType);
            
            let sendable = {
                "action": "createUpdate",
                "elData":{ 
                    "id":null,
                    "cnt":null
                }
            };


            if(parentKey === this.rootDoc){
                sendable.elData.id = 'section_'+this.getNewNumericId();
                sendable.elData.cnt = 'n.a';        
            }else{

                let hierarchy = parentKey.split("-");
                

                switch (hierarchy.length) {
                    case 1:
                        // adding to section
                        if (elType == this.subsection) {
                            sendable.elData.id = hierarchy[0]+'-subsection_'+this.getNewNumericId();
                            sendable.elData.cnt = 'n.a';
                        } else if(elType == this.paragraph){
                            sendable.elData.id = hierarchy[0]+'-paragraph_'+this.getNewNumericId();
                            sendable.elData.cnt = 'n.a';
                        }else{
                            this.showMsg('false', 'invalid element type!')
                            return;
                        }

                        break;
                    case 2:
                        // adding to subsection
                        // clicked add paragraph in subsection
                        // check for key beeing subsection (optional)
                        if(this.isSubSection(parentKey) && elType == this.paragraph){
                            sendable.elData.id = hierarchy[0]+'-'+hierarchy[1]+'-paragraph_'+this.getNewNumericId();
                            sendable.elData.cnt = 'n.a';
                        }else{
                            this.showMsg('false', 'invalid element type or parentId!')
                            return;
                        }

                        break;
                    default:
                        break;
                }
            }

            // console.log( sendable );
            this.createUpdate(sendable, 'create');
            return;
        },
        rmEl(key){
            // console.log(key);

            let action = "delete"
            let sendable = { 
                "action": "delete",
                "elData": { 
                    "id": key
                } 
            };

            var self = this;
            this.$socket.emit('removeElement', sendable, function(resp){
                // if data has not been updated, reload the data to restore 
                // view to previous state
                if(resp.msg === 'ok')
                    self.updateData();

                self.showMsg(resp.msg);
                
            });
            return;
        },
        createUpdate(sendable, pgAction){

            // @todo check not empty sendable
            // let sendable = {
            //     "action":action,
            //     "elData":{
            //         "id": e.target.id,
            //         "cnt": e.target.value,
            //     }
            // };

            var self = this; // => context 
            this.sock.io.emit('createUpdate', sendable, function(resp){
            // this.$socket.emit('createUpdate', sendable, function(resp){
                // if data has not been updated, reload the data to restore 
                // view to previous state
                
                if(resp.msg !== 'ok' || pgAction === 'create')
                    self.updateData(); 

                self.showMsg(resp.msg);
                
            });
            // this.$socket.emit('createUpdate', sendable);

            return;
        },
        showMsg(res, msg){
            // let res = 'ciao';
            if(res === 'ok'){
                this.text = msg || 'saved';
                this.color = 'success';
                this.snackbar = true;
                this.timeout = 800;
            }else{
                this.text = msg || 'some error occured in saving updates';
                this.color = 'error';
                this.snackbar = true;
                this.timeout = 2000;    
                
                // reload data to match server data
                this.getData();
            }

            return;
        },
        getNewNumericId(){
            return Math.floor(new Date().getTime()/1000);
        },
        auto_grow(element) {
            console.log('grw');
            
            if(typeof element.style !== 'undefined' ){
                element.style.height = "5px";
                element.style.height = (element.scrollHeight)+"px";
            }else if(typeof element.originalTarget.style !== 'undefined'){
                element.originalTarget.style.height = "5px";
                element.originalTarget.style.height = (element.originalTarget.scrollHeight)+"px";
            }
        },
        pingServer() {
        // Send the "pingServer" event to the server.
            console.log('ping');
            
            // this.$socket.emit('pingServer', 'PING!')
            this.sock.io.emit('pingServer', 'PING!')
        },
        connect() {
        // Fired when the socket connects.
            console.log('connected');
            this.isConnected = true;
        },
        connected() {
        // Fired when the socket connects.
            console.log('connected');
            this.isConnected = true;
        },
        message(data){
            console.log(data);
        }
    },

    created(){   
        var s = socketio('http://localhost:8180');
        this.sock = new VueSocketIO( {"debug":true, "connection":s });
        // Vue.use( new VueSocketIO( {"debug":true, "connection":SocketInstance }));

console.log( s);
console.log(s.id);

console.log('===================');
console.log(this.sock);
console.log(this.sock.io.connected);

console.log('===================');



        this.getData();
        // console.log(this.sockets);
    },
    watch:{
        elements: function() {
            console.log('fiered for grw');
            
            let txtAreas = document.querySelectorAll("textarea");
            // console.log(txtAreas);
            
            txtAreas.forEach(element => {
                this.auto_grow(element);
            });
        }
    },
    sockets: {
        connect() {
        // Fired when the socket connects.
            console.log('connected');
            this.isConnected = true;
        },

        disconnect() {
            this.isConnected = false;
        },

        // Fired when the server sends something on the "messageChannel" channel.
        message(data){
            console.log(data);
        },

        // on concurrent edting, notifies that changes have been done
        // and refresh is needed
        elementChangedEvent(data){
            console.log('update signal recieved');
            console.log(data);
            
            if(data.update === true)
                this.updateData();
        }


    }
    
}
</script>

<style>
    body {
        overflow: hidden;
    }

    .editor .container{
        padding-top: 5px;
        padding-bottom: 0;
    }
    
    .editor .container .edit-col.layout {
        max-height: calc( 100vh - 16rem );
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .editor .edit-col {

    }

    .editor .edit-col h1, .editor .edit-col h1 > input {
        color: #0d47a0;
    }

    .editor .edit-col h2, .editor .edit-col h2 > input {
        color: #3c5f94;
    }

    .editor .edit-col .sideMenu{
        position: sticky;
        top: 0;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .editor .edit-col .section:hover, .editor .edit-col .section:hover {
        background: #fafafa;
    }
    .editor .edit-col .section > .action-btn, 
    .editor .edit-col .subsection > .action-btn,
    .editor .edit-col .paragraph > .action-btn {
        display: flex;
        justify-content: flex-end;
        padding: 1.5rem .5rem .2rem .5rem; 
        opacity: 0;
    }
    .editor .edit-col .paragraph > .action-btn {
        padding: 0 .5rem .2rem .5rem; 
    }

    .editor .edit-col .paragraph p {
        margin: 0;
    }

    .editor .edit-col .section:hover > .action-btn {
        opacity: 1;
    }
    .editor .edit-col .subsection:hover > .action-btn {
        opacity: 1;
    }
    .editor .edit-col .paragraph:hover > .action-btn {
        opacity: 1;
    }
    
    .editor .edit-col .subsection:hover {
        background: #f1f1f1;
    }

    .editor .edit-col .paragraph:hover {
        background: #eaeaea;
    }
    .editor .edit-col .subsection {
        /* border: 0.5px dashed #999; */
    }

    .editor .edit-col input {
        width: 100%;
    }

    .editor .edit-col input:focus {
        border-bottom: 1px solid #ccc;
    }

    .editor .edit-col textarea {
        width: 100%;
        /* border: 0.5px dashed #ccc; */
        padding: 5px;
        overflow-y: hidden;
    }
    .editor .edit-col textarea:focus {
        border-left: 1px dashed blueviolet;
    }


</style>

