<template>
    <p :id="paragraph.id">
        <textarea @keyup="auto_grow($event.target)" :value="paragraph.cnt" placeholder="Insert your text here..."> </textarea>
    </p>
</template>
<script>
export default {
    props: ['paragraph'],
    data () {
        return {

        }
    },
    methods:{
        auto_grow(element){       
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";
        },
        getParentElement(parentId){
            return document.querySelector(this.paragraph.parentId);
        }

    },

    created (){
        //console.log(this.paragraph.parentId);
        
        //let p = this.getParentElement(this.paragraph.parentId);
        //p.appendChild(this);

    },

    mounted () {
        var myEl = this.$el.querySelector('textarea');
        this.auto_grow(myEl);    

        
    }

}
</script>
