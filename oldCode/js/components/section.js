'use strict';
const util = require('../utils/utils.js');

module.exports = {
    newSection(event, trg){
        
        // get html element id
        let parentId = null;
        let id =  null;
        let cnt = '';
        if(event !== null ){
            parentId = event.target.getAttribute('data-parent-target');
            id = 'sec'+util.getNewNumericId();
        }
        else{
            parentId = trg.parentId;
            id = trg.id;
            cnt = trg.cnt;
        }

        //check parentId is not null 
        if(parentId === null || id === null)
            return false;

        // create chapter wrapper
        var chapter = document.createElement('div');    
        chapter.id = id;
        chapter.classList = 'sectionWrapper wrapper';
        
        // chapter components
            let chapterTitle = document.createElement('h2');
            chapterTitle.classList = 'sectionTitle';
            //chapterTitle.setAttribute('id',chapter.id +'-title');
            // chapterTitle.innerHTML = '<input type="text" id="'+chapter.id +'-title" placeholder="Chapter title">';
            
                let inpt = document.createElement('input');
                inpt.setAttribute('type','text');
                if( cnt != '') {
                    inpt.setAttribute('value', cnt);
                }
                inpt.setAttribute('placeholder',"Section title");
                //inpt.addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);
                chapterTitle.appendChild(inpt);
                
            // add chapter title to chapter
            chapter.appendChild(chapterTitle);

            let contentArea = document.createElement('div');
            contentArea.id = chapter.id + '-cnt' + util.getNewNumericId();
            contentArea.classList = 'cnt';
            chapter.appendChild(contentArea);

            //get action btns, 'add subchapte, add paragraph, etc'
            //let btnActions = actionBtns(contentArea.id, 1);

            //chapter.appendChild(btnActions);
        
        //return element 
        return {
            "parentTarget": parentId,
            "id": id,
            "htmlElem": chapter
        }        
        //return chapter;
    }
}