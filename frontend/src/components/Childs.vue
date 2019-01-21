<template>
    <div>
        <div v-if="child.type=='section'" :class="livClass">

            <h1 v-if="child.liv==1">
                <input 
                    v-bind:id="k"
                    v-model="child.title"
                    @blur="updateEl"
                />
            </h1>
            <h2 v-if="child.liv==2">
                <input 
                    v-bind:id="k"
                    v-model="child.title"
                    @blur="updateEl"
                />
            </h2>
            <h3 v-if="child.liv==3">
                <input 
                    v-bind:id="k"
                    v-model="child.title"
                    @blur="updateEl"
                />
            </h3>
                        
            <child v-for="(ch, k2) in child.childs" :key="k2" :k="k2" :child="ch" @handleEventData="handleEventData"></child>
            
            <div class="action-btn">
                <v-btn v-bind:id="k" small flat class="blue--text" @click="addNewEl()">
                    <v-icon>add</v-icon>
                    <span>SubSection</span>
                </v-btn>
                <v-btn v-bind:id="k" small flat class="blue--text" @click="addNewEl()">
                    <v-icon>add_circle_outline</v-icon>
                    <span>paragraph</span>
                </v-btn>
                
                <v-btn v-bind:id="k" small icon class="red--text" @click="rmEl(k)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </div>
        </div>
        <div v-else class="atom-element">
            <p v-if="child.type=='p'">
                <textarea 
                    v-bind:id="k"
                    v-model="child.content"
                    @blur="updateEl">
                </textarea>
            </p>
            <div class="action-btn ">
                <v-spacer></v-spacer>
                <v-btn v-bind:id="k"  small  icon  class="red--text" @click="rmEl(k)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </div>
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
    data() {
        return {
            ok: true,
            livClass: 'section-'+this.child.liv
        }
    },
    created(){
        /* eslint-disable */    
        console.log(this.k+'-'+this.child);
    },
    methods: {
        updateEl(e){
            
            let data = {
                action: 'update',
                el: e
            }

            this.$emit('handleEventData', data);

        },
        rmEl(key){
            
            let data = {
                action: 'delete',
                key: key,
            }

            this.$emit('handleEventData', data);
        },
        handleEventData(data){
            // event bubbling
            this.$emit('handleEventData', data);
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
