
var tmpHolder;


// function
(function(){
    console.log('hello')

})();

function addChapter(event) {
    // get html element id
    let target = event.target.getAttribute('data-chapter-target');
    console.log(target);

    // create chapter wrapper
    let chapter = document.createElement('div');    
    chapter.id = 'chp'+Math.floor(new Date().getTime()/1000);
    chapter.classList = 'chapterWrapper';
    
    // chapter components
        let chapterTitle = document.createElement('h2');
        chapterTitle.classList = 'chapterTitle';
        chapterTitle.setAttribute('id',chapter.id +'-title');
        // chapterTitle.innerHTML = '<input type="text" id="'+chapter.id +'-title" placeholder="Chapter title">';
        
            let inpt = document.createElement('input');
            inpt.setAttribute('type','text');
            inpt.setAttribute('placeholder',"Chapter title");
            inpt.addEventListener('blur', saveFile);

            chapterTitle.appendChild(inpt);
            
        // add chapter title to chapter
        chapter.appendChild(chapterTitle);

        let contentArea = document.createElement('div');
        contentArea.id = chapter.id + '-cnt' + Math.floor(new Date().getTime()/1000);
        contentArea.classList = 'cnt';
        chapter.appendChild(contentArea);

        //get action btns, 'add subchapte, add paragraph, etc'
        let btnActions = actionBtns(contentArea.id, 1);

        chapter.appendChild(btnActions);

    // add chapter to DOM
    document.getElementById(target).appendChild(chapter);
    
    // update server with new information
}

function addSubChapter(event) {
    console.log('subchapter');
    let parentId = event.target.getAttribute('data-parent-chapter');
    let parent = document.getElementById(parentId);

    let subChapter = document.createElement('div');
    subChapter.classList = 'subChapter';
    subChapter.id = parentId + '-sub'+ Math.floor(new Date().getTime()/1000);
    
    // subchapter components
        //add subchapter title (h3)
        let subChapterTitle = document.createElement('h3');
        subChapterTitle.classList = 'subChapterTitle';
        subChapterTitle.setAttribute('id',subChapter.id +'-title');
        // subChapterTitle.innerHTML = '<input type="text" id="'+subChapter.id +'-title" placeholder="SubChapter title">';
            let inpt = document.createElement('input');
            inpt.setAttribute('type','text');
            inpt.setAttribute('placeholder',"Chapter title");
            inpt.addEventListener('blur', saveFile);

            subChapterTitle.appendChild(inpt);
        
        // add chapter title to chapter
        subChapter.appendChild(subChapterTitle);

        //add content area 
        let contentArea = document.createElement('div');
        contentArea.id = subChapter.id + '-subCnt';
        contentArea.classList = 'subChapterCnt';
        subChapter.appendChild(contentArea);

        //add action btn (disable addSubchapterBtn)
        let btnActions = actionBtns(contentArea.id, 2);
        subChapter.appendChild(btnActions);

    parent.appendChild(subChapter);
}

function addParagraph(event) {
    console.log('paragraph');
    let parentId = event.target.getAttribute('data-parent-chapter');
    let parent = document.getElementById(parentId);

    let prgInput = document.createElement('p');
    prgInput.id = parentId + '-prg';

    let txt = document.createElement('textarea');
    txt.setAttribute('placeholder','Insert your text here...');
    txt.addEventListener('blur', saveFile);

    prgInput.appendChild(txt);

    parent.appendChild(prgInput);
}





/**
 * return the bntBar with the action buttons
 * @param {string} parentTarget parent container where to add the btnBar
 * @param {int} liv liv 0 => root, 1 => chapter, 2 => subchapter
 * @return {object} btnBar
 */
function actionBtns(parentTarget, liv) {
    // @TODO  implement all action buttons 'remove, save, etc'
    let btnActions = document.createElement('div');
    btnActions.classList = "chpBtnWrapper";

    // action buttons
    if(liv != 2){
        let addSubChapter = subChapterBtn(parentTarget);    
        btnActions.appendChild(addSubChapter);
    }
    let addParagraph = paragraphBtn(parentTarget);
    btnActions.appendChild(addParagraph);
    
    return btnActions;
}


function subChapterBtn(parentTarget){
    let addSubChapter = document.createElement('button');
    addSubChapter.classList = '';
    addSubChapter.setAttribute('data-parent-chapter', parentTarget );
    addSubChapter.setAttribute('title','Add subchapter');
    addSubChapter.setAttribute('onclick','addSubChapter(event)');
    addSubChapter.setAttribute('name','Add subchapter');
    addSubChapter.innerHTML = 'Add subchapter';

    return addSubChapter;
}

function paragraphBtn(parentTarget){
    let prg = document.createElement('button');
    prg.classList = '';
    prg.setAttribute('data-parent-chapter', parentTarget );
    prg.setAttribute('title','Add Paragraph');
    prg.setAttribute('onclick','addParagraph(event)');
    prg.setAttribute('name','Add Paragraph');
    prg.innerHTML = 'Add Paragraph';

    return prg;
}



/** */
function saveFile(event) {
    // console.log(event);

    let pTarget = event.target.parentNode; 
    let id = pTarget.getAttribute('id');
    
    let dataContent = event.target.value;
    
    let sendable = {
        'target-id': id,
        'value': dataContent
    };

    console.log(sendable);
    
    // let xml = new XMLSerializer().serializeToString(document.getElementById('pgContainer'));
    // console.log(xml);
    
    
}





function saveInputData(event){

    let data = event.target.getAttribute('value');
    console.log(data);
    



}




document.addEventListener("DOMContentLoaded", function(event) { 
    //do work

});