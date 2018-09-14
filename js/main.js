document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
  
    var mainDoc = document.querySelector('#main-document');

    var chapters = document.querySelectorAll('.chapter');
    
    const menu = document.querySelector('#csContextMenu');
    var menuVisble = false;


    const toggleMenu = command => {
        menu.style.display = command === "show" ? "block" : "none";
        this.menuVisible = !this.menuVisible;
    };
      

      
    const setPosition = ({ top, left }) => {
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    toggleMenu("show");
    };
    
    window.addEventListener("click", e => {
    if(this.menuVisible)
        toggleMenu("hide");
    });
      

    chapters.forEach(function(chapter){
        chapter.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const origin = {
            left: e.pageX,
            top: e.pageY
            };
            setPosition(origin);
            return false;
        });

    });


    

    


    function loadDocPage(name){

    }

    function addChapter($title){
        //add a simple input
        var pgCnt = mainDoc.querySelector('#pg-content');

        // var ch = ducument.createElement('div');
        // ch.setAttribute('class', 'chapter');
        // ch.setAttribute('text', 'new text');

        // apCnt.appendChild(ch);
        
    }

    function addSection(id_chapter = null){
        //add a simple imput 
    }

    function addParagraph(id_section = null){
        //load tiny_mce
    }


    function openPopUp(){
        let dom = inputPopup
    }

});