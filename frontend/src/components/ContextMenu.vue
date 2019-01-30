<template>
    <!-- Context menu implementation -->
        <div class="custom_context_menu">
            <hr class="element-delimeter" :style="{ 'border-color': lineColor}">
            <v-menu bottom right class="custom_menu_btn">
                <v-btn
                slot="activator"
                :color="lineColor"
                dark
                icon
                >
                <v-icon>add</v-icon>
                </v-btn>

                <v-list>
                    <v-list-tile v-if="liv < 3"
                        v-bind:id="k" small flat class="blue--text" 
                        
                        @click="createEl('section')"
                    >
                        <v-list-tile-title>
                            <v-icon>add</v-icon>
                            <span>SubSection</span>
                        </v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile
                        v-bind:id="k" small flat class="blue--text" 
                        
                        @click="createEl('paragraph')"
                    >
                        <v-list-tile-title>
                            <v-icon>assignment</v-icon>
                            <span>Paragraph</span>
                        </v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile
                        v-bind:id="k" small flat class="blue--text" 
                        
                        @click="createEl('image')"
                    >
                        <v-list-tile-title>
                            <v-icon>add_photo_alternate</v-icon>
                            <span>Image</span>
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                        v-bind:id="k" small flat class="blue--text" 
                        
                        @click="createEl('code')"
                    >
                        <v-list-tile-title>
                            <v-icon>code</v-icon>
                            <span>Code</span>
                        </v-list-tile-title>
                    </v-list-tile>

                </v-list>
            </v-menu>

        </div>
<!--  -->
</template>

<script>
export default {
    name: "ContextMenu",
    props:{
        k: String,
        pK: Array,
        liv: Number,
        lineColor: String,
    },
    methods:{
        createEl(type){

            if(type){

                let data = {
                    action: 'create',
                    elType: type,
                    pathIds: this.pK,
                    selElId: this.k,
                    cnt: 'n.a'
                }

                this.$emit('handleEventData', data);
            }else{
                let msg = 'ERROR: no type specified';
                this.$emit('errorEvent', msg);
            }
        },
        handleEventData(data){
            // event bubbling
            this.$emit('handleEventData', data);
        },
    }

}
</script>

<style>
.custom_context_menu {
    min-height: 0.3rem;
    position: relative;
    opacity: 0;
}

.custom_context_menu:hover {
    opacity: 1;
}

.custom_context_menu hr.element-delimeter {
    margin: 0.1rem 0;
    border: 0; 
    border-bottom: 2px dashed #0d47a0; 
    /* background: #999;  */
}

.custom_context_menu .custom_menu_btn {
    position: absolute;
    right: -2rem;
    top: -1.8rem;

}
</style>

