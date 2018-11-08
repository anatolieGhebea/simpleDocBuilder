<template>
    <div class="docRoot" id="docRoot">
        <h1><input type="text" id="docTitle" placeholder="Document title..." v-model="docTitle"> </h1>

        <!-- <chapter v-for="el in elementList" :key="el.id" :chapter="el"></chapter> -->
        
    </div>
</template>
<script>

export default {
    data () {
        return {
            docTitle:'',
            elementList: [],
            elementTreeList: []
        }
    },

    methods: {
        convertToTree (elementList, tree = null) {    
            //@TODO => optimize this function  
            if(tree === null)
                tree = [];

            var unsorted = [];

            
            // if l non has not been incremented than the algorithm failed
            // to add element to the tree (orfan element or parent not yet created)
            var l = { 'count': 0};
            for(var i = 0; i < elementList.length; i++){
                
                if(elementList[i].parentId == 'docRoot'){
                    tree.push(elementList[i]);
                    l.count++;
                    console.log('l1');
                }else{
                    tree = this.addChild(elementList[i],tree, l);
                }
                
            }     
            
            if(l.count == elementList.length){
                this.elementTreeList = tree;
                return 'ok';
            }else{
                // convert this return to Warrning 
                return false;
            }
             
        },

        addChild (child, tree, l){

             for(var j=0; j < tree.length; j++){
                console.log('for-'+j);
                
                if(tree[j].id == child.parentId) {
                    if(tree[j].elements == null || tree[j].elements == undefined){
                        tree[j].elements = [];
                    }                    
                    if( child.elements == undefined ){
                        console.log('add ch.el');
                        child.elements = [];
                    }

                    tree[j].elements.push(child);
                    l.count++;
                    break;
                }else{
                    if(tree[j].elements !== undefined ){          
                        tree[j].elements = this.addChild(child, tree[j].elements,l);       
                    }
                }

            }
            
            return tree;
        },

        genHtml (){
            console.log(this.$el);
            console.log(this.elementList.length);
            
            for (var i = 0; i < this.elementList.length; i++) {
                var tp = '';
                var tpp = null;
                console.log('before switch');
                
                switch (this.elementList[i].type) {
                    case 'chp':
                        tp = 'chapter :'+ this.elementList[i].id +' => '+this.elementList[i].id;
                        tpp = 'chapter';
                        break;
                    case 'subchp':
                        tp = 'subchapter :'+ this.elementList[i].id +' => '+this.elementList[i].id;
                        tpp = 'subchapter';
                        break;
                    case 'p':
                        tp = 'paragraph :'+ this.elementList[i].id +' => '+this.elementList[i].id;
                        tpp = 'paragraph';
                        break;
                
                    default:
                        break;
                }
                console.log('=========');
                
                var child = document.createElement(tpp);
                child.setAttribute(':'+tpp, (this.elementList[i])  );
                
                //child.innerHTML = tp;

                console.log(child);
                

                this.$el.appendChild(child);
            }
        }


    },

    created () {
        this.$http.get('builder.php')
            .then(function(response){
                let r = response.body;

                this.docTitle = r.docTitle;
                this.elementList = r.elements;

               // this.convertToTree(this.elementList);
               this.genHtml();
            })
            .catch(function(e){
                console.log( 'Some Error' + e);
                
            })
    },

}
</script>

<style lang="scss">
.docRoot {
    
    #docTitle {
        font-size: 20px;
    }
}
</style>

