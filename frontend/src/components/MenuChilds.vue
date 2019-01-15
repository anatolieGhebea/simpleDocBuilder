<template>
    <li v-if="menuChild.type=='section'">
        <a v-bind:href="'#'+k" >{{ menuChild.title }} </a>
        <!-- <ul v-if="menuChild.type=='section'"> -->
        <ul>
            <menu-child v-for="(mch, k2) in menuChild.childs" :key="k2" :k="k2" :menu-child="mch"></menu-child>
        </ul>
    </li>    
</template>

<script>
export default {
    name:'MenuChild',
    props:{
        k: String,
        menuChild: Object
    },
    created(){
        /* eslint-disable */    
    },
    methods: {

    }

}
</script>
