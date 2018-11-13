'use strict';
//import util from './utils/utils';
const util = require('../utils/utils');

module.exports = {
    newParagraph(event, trg) {
        let parentId = null;
        let id = null;
        let cnt = '';
        let parent = null;

        if(event !== null){
            parentId = event.target.getAttribute('data-parent-target');
            id = 'p'+ util.getNewNumericId();
            parent = document.getElementById(parentId);
        }else{
            parentId = trg.parentId;
            id = trg.id;
            cnt = trg.cnt;
            //get parent contentArea 
            let cntAreas = document.getElementById(parentId).getElementsByClassName('cnt');
            parent = cntAreas[0];
        }
    
        if(parentId === null || id === null )
            return false
    
        let prgInput = document.createElement('p');
        prgInput.id = id;
    
        let txt = document.createElement('textarea');
        if ( cnt != ''){
            txt.innerHTML = cnt;
        }
        txt.setAttribute('placeholder','Insert your text here...');
        //txt.setAttribute('onkeyup',"auto_grow(this)");
        txt.addEventListener('keyup',this.auto_grow);

        //txt.addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);
    
        prgInput.appendChild(txt);
        //return prgInput;
        return {
            "parentTarget": parentId,
            "id": id,
            "htmlElem": prgInput
        } 
    },
    auto_grow(element) {
        if(typeof element.style !== 'undefined' ){
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";
        }else if(typeof element.originalTarget.style !== 'undefined'){
            element.originalTarget.style.height = "5px";
            element.originalTarget.style.height = (element.originalTarget.scrollHeight)+"px";
        }
    
    }
}

/* function auto_grow(element) {
    if(typeof element.style !== 'undefined' ){
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";
    }else if(typeof element.originalTarget.style !== 'undefined'){
        element.originalTarget.style.height = "5px";
        element.originalTarget.style.height = (element.originalTarget.scrollHeight)+"px";
    }

} */
