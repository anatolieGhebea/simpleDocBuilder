<template>
    <div id="my-editor-cnt" class="editor">
    
        <v-container fluid>
        
            <v-layout row class="edit-col">
                <!-- 3 col configuration -->
                <v-flex md2 class="pa-1 hidden-sm-and-down sideMenu">
                    <v-btn flat outline color="green" @click="logHtml">log html</v-btn>
                    <v-btn flat outline color="orange" @click="navTo('editor')">edit file</v-btn>
                    <v-card flat class="pa-1">
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
                <v-flex sm12 md8 lg6 class="">
                    <!-- <h2 class="grey--text">Content</h2> -->
                    <v-card flat class="pa-4">
                        
                        <v-layout column>
                            <v-flex>
                                <div class="document-header-info">
                                    <h1> {{ docTitle }} </h1>
                                    <div class="meta-info">
                                        <p>Version: {{ docVersion }}</p>
                                        <p>Lang: {{ docLang }}</p>
                                        <p>LlastUpdate: </p>
                                    </div>
                                </div>
                            </v-flex>
                            <v-flex v-for="(lv1, key ) in elements" :key="key">
                                <div class="pa-1 section">
                                    <h2 v-bind:id="key">{{lv1.title}}</h2>

                                    <div v-for="(lv2, key1) in lv1" :key="key1">
                                        <div v-if="isSubSection(key1)">
                                            <!-- subsection found -->
                                            <div class="px-3 subsection">
                                                <h3 v-bind:id="key1">{{lv2.title}}</h3>
                                                
                                                <div v-for="(lv3, key2) in lv2" :key="key2">
                                                    <div v-if="isParagrph(key2)" class="px-2 paragraph">
                                                        <p>{{lv3.content}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else-if="isParagrph(key1)">
                                            <!-- paragraph found -->
                                            <div class="mt-1 px-1 paragraph"> 
                                                <p> {{lv2.content}}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <br/><br/>
                            </v-flex> 
                        </v-layout>
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
export default {
    data(){
        return {
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
            baseRoot:"http://localhost:8080",
            docTitle: "",
            docVersion: "",
            docLang: "",
            lastMod: new Date(),
            elements:[]
        }
    },
    methods:{
        getData(){
            
            this.$http.get(this.baseRoot+'/rawJson')
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
        logHtml(){

            var w = document.querySelector('#my-editor-cnt');

            console.log(w.outerHTML);


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
        navTo(p){
console.log('error to' + p);
return;
            this.$router.go({
                path: p
            })

        }
    },

    created(){        
        this.getData();
    },
    watch:{
        elements: function() {
            console.log('fiered');
            
            let txtAreas = document.querySelectorAll("textarea");
            console.log(txtAreas);
            
            txtAreas.forEach(element => {
                this.auto_grow(element);
            });
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
        max-height: calc( 100vh - 5rem );
        overflow-y: scroll;
        overflow-x: hidden;
        scroll-behavior: smooth;
    }

    .editor .edit-col h1 {
        margin: 1rem 0;
    }

    .editor .edit-col h2 {
        color: #0d47a0;
        margin: 1rem 0;
    }

    .editor .edit-col h3 {
        color: #3c5f94;
        margin: 0.8rem 0;
    }

    
    .editor .edit-col .sideMenu{
        position: sticky;
        top: 0;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .editor .edit-col .sideMenu .v-card {
        /* background: #252627; */
        /* color: #fafafa; */
        background: transparent;
    }

    
    .editor .edit-col .v-card{
        background: #fcfcfc;
    }




    .editor .document-header-info {
        text-align: center;
    }

    .editor p {
        margin: .5rem 0 1rem 0;
        letter-spacing: 0.3px;
        font-size: 100%;
        line-height: 1.8;
    }

    .editor .document-header-info p {
        margin: 0;
        margin-bottom: .2rem;
    }


</style>

