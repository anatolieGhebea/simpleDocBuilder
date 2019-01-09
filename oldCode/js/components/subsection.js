'use strict';
const util = require('../utils/utils.js')

module.exports = {
    newSubsection(event, trg){
        let parentId = null;
        let id = null;
        let cnt = '';
        let parent = null;
        if(event !== null){
            parentId = event.target.getAttribute('data-parent-target');
            id = 'subsec'+ util.getNewNumericId();
            parent = document.getElementById(parentId);
        }else{
            parentId = trg.parentId;
            id = trg.id;
            cnt = trg.cnt;
            //get parent contentArea 
            let cntAreas = document.getElementById(parentId).getElementsByClassName('cnt');
            parent = cntAreas[0];
        }

        if(parentId === null || id === null || parent === null)
            return false
        
        let subChapter = document.createElement('div');
        subChapter.classList = 'subSection wrapper';
        subChapter.id = id;
        
        // subchapter components
            //add subchapter title (h3)
            let subChapterTitle = document.createElement('h3');
            subChapterTitle.classList = 'subSectionTitle';
            //subChapterTitle.setAttribute('id',subChapter.id +'-title');
            // subChapterTitle.innerHTML = '<input type="text" id="'+subChapter.id +'-title" placeholder="SubChapter title">';
                let inpt = document.createElement('input');
                inpt.setAttribute('type','text');
                if( cnt != '') {
                    inpt.setAttribute('value', cnt);
                }
                inpt.setAttribute('placeholder',"SubSection title"); 
                //inpt.addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);
                subChapterTitle.appendChild(inpt);
            
            // add chapter title to chapter
            subChapter.appendChild(subChapterTitle);

            //add content area 
            let contentArea = document.createElement('div');
            contentArea.id = subChapter.id + '-subCnt';
            //contentArea.classList = 'subChapterCnt';
            contentArea.classList = 'cnt';
            subChapter.appendChild(contentArea);

        //return subChapter;
        return {
            "parentTarget": parentId,
            "id": id,
            "htmlElem": subChapter
        } 
    }
}