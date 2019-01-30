<template>
    <div>
        <div v-if="child.type=='section'" :class="livClass">
            <div class="head-element">
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
                
                <v-tooltip right>
                    <v-btn v-bind:id="k" small icon class="red--text hover-visible" @click="rmEl(k, pK)" slot="activator">
                        <v-icon>delete</v-icon>
                    </v-btn>
                    <span> <b class="text--red">Warning!!</b> the section and all section content will be removed</span>
                </v-tooltip>
            </div>

            <context-menu :k="k" :pK="pathIds" :liv="child.liv" :lineColor="livColor" ></context-menu>

            
            <child v-for="(ch, k2) in child.childs" :key="k2" :k="k2" :pK="pathIds" :child="ch" @handleEventData="handleEventData" @errorEvent="errorEvent"></child>
            
            <context-menu :k="k" :pK="pathIds" :liv="child.liv" :lineColor="livColor" ></context-menu>
            
        </div>
        <div v-else >
            <div class="atom-element">
                <p v-if="child.type=='p'">
                    <textarea 
                        v-bind:id="k"
                        v-model="child.content"
                        @blur="updateEl">
                    </textarea>
                </p>
                <v-tooltip right>
                    <v-btn v-bind:id="k" small icon class="red--text hover-visible" @click="rmEl(k, pK)" slot="activator">
                        <v-icon>delete</v-icon>
                    </v-btn>
                    <span> <b class="red--text">Warning!!</b> the highlighted element will be removed</span>
                </v-tooltip>
            </div>
            <context-menu :k="k" :pK="pathIds" :liv="pLiv" :lineColor="pLivColor" ></context-menu>
        </div>
        


    </div>
</template>

<script>
import ContextMenu from '../components/ContextMenu.vue';
export default {
    name:'child',
    components:{
        "context-menu": ContextMenu
    },
    props:{
        k: String,
        pK: Array,
        child: Object
    },
    data() {
        return {
            ok: true,
            livClass: 'section-'+this.child.liv,
            livColor: this.getLivColor(this.child.liv),
            pLiv: this.getParentLiv(),
            pLivColor: this.getLivColor(this.getParentLiv()),
            pathIds: []
        }
    },
    created(){
        /* eslint-disable */    
        // console.log(this.k);
        // console.log(this.child.liv);
        // console.log(this.pK);
        
        for (let index = 0; index < this.pK.length; index++) {
            this.pathIds.push(this.pK[index]);
        }
            // this.pathIds.push(this.pK[0]);
        
        this.pathIds.push(this.k);

        // console.log(this.pathIds);
        

        // console.log(this.pathIds);
        // this.pK.push(this.k);
        // console.log(this.pK);

        // this.pathIds = this.getPathIds();
        // console.log(this.pathIds);
    },
    methods: {
        getLivColor(liv){
            let color;
            switch (liv) {
                case 1:
                    color = 'primary';
                    break;
                case 2:
                    color = 'green';
                    break;
                case 3:
                    color = 'orange'
                    break;
            
                default:
                    color = 'secondary';
                    break;
            }

            return color;
        },
        getParentLiv(){
            return this.child.liv - 1;
        },
        updateEl(e){
            
            let data = {
                action: 'update',
                elType: this.child.type,
                pathIds: this.pK,
                selElId: this.k,
                cnt: e.target.value
            }

            this.$emit('handleEventData', data);

        },
        rmEl(key, pKey){
            
            let data = {
                action: 'delete',
                elType: this.child.type,
                pathIds: this.pK,
                selElId: this.k,
            }

            this.$emit('handleEventData', data);
        },
        handleEventData(data){
            // event bubbling
            this.$emit('handleEventData', data);
        },
        errorEvent(data){
            // event bubbling
            this.$emit('errorEvent', data);
        },
    }

}
</script>

<style>
.atom-element,
.head-element {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
}
.head-element .hover-visible,
.atom-element .hover-visible {
    opacity: 0;
}
.head-element:hover .hover-visible, 
.atom-element:hover .hover-visible {
    opacity: 1;
}

.head-element h1,
.head-element h2,
.head-element h3,
.head-element h4 {
    display: flex;
    align-content: center;
    flex-grow: 1;
}

.atom-element > p {
    flex-grow: 1;
}

.atom-element .v-tooltip {
    display: flex;
    align-items: center;
}

.mv-hidden{
    display: none;
}






</style>
