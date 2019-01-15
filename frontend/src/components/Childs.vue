<template>
    <div>
        <div v-if="child.type=='section'" class="section">
            {{ getHTagOpen(child.liv) }}

                <input 
                    v-bind:id="k"
                    v-model="child.title"
                    @blur="updateEl"
                />
            
            {{ getHTagClose(child.liv) }}

            <child v-for="(ch, k2) in child.childs" :key="k2" :k="k2" :child="ch"></child>
            
        </div>
        <div v-else class="atom-element">
            <p v-if="child.type=='p'">
                <textarea 
                    v-model="child.content">
                </textarea>
            </p>

        </div>

    </div>
</template>

<script>
export default {
    name:'child',
    props:{
        k: String,
        child: Object
    },
    created(){
        /* eslint-disable */    
        console.log(this.k+'-'+this.child);
    },
    methods: {
        updateEl(el){

        },
        getHTagOpen(liv){
            return `<h${liv}>`;
        },
        getHTagClose(liv){
            return `</h${liv}>`;
        }
    }

}
</script>
