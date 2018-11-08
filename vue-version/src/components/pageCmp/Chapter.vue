<template>
    <div v-bind:id="chapter.id" class="chapterWrapper wrapper">
        <p>some dummy text</p>
        <h2 class="chapterTitle"><input :value="chapter.cnt"></h2>

        <div :id="cntId" class="cnt">

        </div>
    </div>
</template>
<script>
export default {
    props: ['chapter'],
    data () {
        return {
            cntId:''
        }
    },
    methods: {
        newId () {
            return this.chapter.id +'-cnt'+Math.floor(new Date().getTime()/1000);
        }
    },

    created (){
        this.cntId = this.newId();
        console.log('cr');
        
    }  
    
}

</script>
