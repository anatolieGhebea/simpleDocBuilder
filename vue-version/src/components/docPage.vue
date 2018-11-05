<template>
    <div class="docRoot" id="docRoot">
        <h1><input type="text" id="docTitle" placeholder="Document title..." v-model="docTitle"> </h1>

        <div>
            <ul>
                <li v-for="el in elementTreeList" :key="el.id"> 
                    {{ el.id }} <br> 
                    {{ el.cnt }} 
                    <ul>
                        <li v-for="l in el.elements" :key="l.id">
                            {{ l.id }} <br>
                            {{ l.cnt }}
                        </li>
                    </ul>
                    <hr> 
                
                </li>
            </ul>
        </div>

<!--         <div v-for="el in elementList" :key="el.id">
            <chapter v-if="el.type=='chp'" :chapter="el"></chapter>

            <paragraph v-if="el.type=='p'" :paragraph="el"></paragraph>
        </div> -->

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

            console.log(l);
            console.log(elementList.length);
            

            console.log(tree);
            
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
        }


    },

    created () {
        this.$http.get('builder.php')
            .then(function(response){
                let r = response.body;

                this.docTitle = r.docTitle;
                this.elementList = r.elements;

                this.convertToTree(this.elementList);
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

