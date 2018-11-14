
var tmpHolder;

function addChapter(event, trg) {
    // get html element id
    let target = null;
    let id =  null;
    let cnt = '';
    if(event !== null ){
        target = event.target.getAttribute('data-chapter-target');
        id = 'chp'+getNumNewId();
    }
    else{
        target = trg.parentId;
        id = trg.id;
        cnt = trg.cnt;
    }

    //check target is not null 
    if(target === null || id === null)
        return false;

    // create chapter wrapper
    let chapter = document.createElement('div');    
    chapter.id = id;
    chapter.classList = 'chapterWrapper wrapper';
    
    // chapter components
        let chapterTitle = document.createElement('h2');
        chapterTitle.classList = 'chapterTitle';
        //chapterTitle.setAttribute('id',chapter.id +'-title');
        // chapterTitle.innerHTML = '<input type="text" id="'+chapter.id +'-title" placeholder="Chapter title">';
        
            let inpt = document.createElement('input');
            inpt.setAttribute('type','text');
            if( cnt != '') {
                inpt.setAttribute('value', cnt);
            }
            inpt.setAttribute('placeholder',"Chapter title");
            inpt.addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);
            chapterTitle.appendChild(inpt);
            
        // add chapter title to chapter
        chapter.appendChild(chapterTitle);

        let contentArea = document.createElement('div');
        contentArea.id = chapter.id + '-cnt' + Math.floor(new Date().getTime()/1000);
        contentArea.classList = 'cnt';
        chapter.appendChild(contentArea);

        //get action btns, 'add subchapte, add paragraph, etc'
        let btnActions = actionBtns(contentArea.id, 1);

        let deleteBtn = removeElementBtn(id, 'Delete section and all contained subsections and paragraphs','Delete Section');//get btn "template"
        btnActions.appendChild(deleteBtn);

        chapter.appendChild(btnActions);

    // add chapter to DOM
    document.getElementById(target).appendChild(chapter);
    
    // update server with new information
}

function addSubChapter(event, trg) {
    let parentId = null;
    let id = null;
    let cnt = '';
    let parent = null;
    if(event !== null){
        parentId = event.target.getAttribute('data-parent-chapter');
        id = 'schp'+ getNumNewId();
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
    subChapter.classList = 'subChapter wrapper';
    subChapter.id = id;
    
    // subchapter components
        //add subchapter title (h3)
        let subChapterTitle = document.createElement('h3');
        subChapterTitle.classList = 'subChapterTitle';
        //subChapterTitle.setAttribute('id',subChapter.id +'-title');
        // subChapterTitle.innerHTML = '<input type="text" id="'+subChapter.id +'-title" placeholder="SubChapter title">';
            let inpt = document.createElement('input');
            inpt.setAttribute('type','text');
            if( cnt != '') {
                inpt.setAttribute('value', cnt);
            }
            inpt.setAttribute('placeholder'," subChapter title"); 
            inpt.addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);
            subChapterTitle.appendChild(inpt);
        
        // add chapter title to chapter
        subChapter.appendChild(subChapterTitle);

        //add content area 
        let contentArea = document.createElement('div');
        contentArea.id = subChapter.id + '-subCnt';
        //contentArea.classList = 'subChapterCnt';
        contentArea.classList = 'cnt';
        subChapter.appendChild(contentArea);

        //add action btn (disable addSubchapterBtn)
        let btnActions = actionBtns(contentArea.id, 2);

        // add delete Btn
        let deleteBtn = removeElementBtn(id, 'Delete subsection and all contained paragraphs','Delete Subsection');//get btn "template"
        btnActions.appendChild(deleteBtn);

        subChapter.appendChild(btnActions);

    parent.appendChild(subChapter);
}

function addParagraph(event, trg) {
    let parentId = null;
    let id = null;
    let cnt = '';
    let parent = null;
    if(event !== null){
        parentId = event.target.getAttribute('data-parent-chapter');
        id = 'p'+ getNumNewId();
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
    txt.setAttribute('onkeyup',"auto_grow(this)");
    txt.addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);

    prgInput.appendChild(txt);

    let deleteBtn = removeElementBtn(id, 'Delete paragraph','Delete Paragraph');//get btn "template"
    prgInput.appendChild(deleteBtn);

    parent.appendChild(prgInput);
}


function deleteElement(event){
    saveInputData(event,'delete');
    let el = document.getElementById(event.target.getAttribute('data-delete-target'));
    el.parentNode.removeChild(el);
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
    addSubChapter.classList = 'actionBtn section';
    addSubChapter.setAttribute('data-parent-chapter', parentTarget );
    addSubChapter.setAttribute('title','Add subchapter');
    addSubChapter.setAttribute('onclick','addSubChapter(event)');
    addSubChapter.setAttribute('name','Add subchapter');
    addSubChapter.innerHTML = 'Add subchapter';

    return addSubChapter;
}

function paragraphBtn(parentTarget){
    let prg = document.createElement('button');
    prg.classList = 'actionBtn paragraph';
    prg.setAttribute('data-parent-chapter', parentTarget );
    prg.setAttribute('title','Add Paragraph');
    prg.setAttribute('onclick','addParagraph(event)');
    prg.setAttribute('name','Add Paragraph');
    prg.innerHTML = 'Add Paragraph';

    return prg;
}

function removeElementBtn(target, title, innerValue){

    let btn = document.createElement('button');
    btn.classList = 'actionBtn delete';
    btn.setAttribute('data-delete-target', target );
    btn.setAttribute('onclick','(event)');
    btn.setAttribute('name','Delete');
    btn.setAttribute('title',title);
    btn.innerHTML = innerValue;

    return btn;    
}


function buildWorkingPage(data){
    var cmp = data.elements;
    console.log(cmp);
    
    //set document title
    document.getElementById('docTitle').setAttribute('value', data.docTitle);
    //generate documento form json
    cmp.forEach(element => {
        switch(element.type){
            case "chp": 
                addChapter(null, element);
                break;
            case "subchp":
                addSubChapter(null, element);
                break;
            case "p":
                addParagraph(null, element);
                break;
            default:
                break;
        } 
    });

    //make all text areas big to fit content
    let els = document.querySelectorAll("textarea");
    els.forEach(function(el){        
        auto_grow(el);
    });
}


function getNumNewId(){
    return Math.floor(new Date().getTime()/1000);
}

/** server iteraction */
function saveFile(event) {

    // let xml = new XMLSerializer().serializeToString(document.getElementById('pgContainer'));
    // console.log(xml);  
    
}


function loadDocumentData() {
    //load json file with data from server
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            rs = JSON.parse(this.responseText);
            buildWorkingPage(rs);
            
        }
    };
    xmlhttp.open("GET", "builder.php", true);
    xmlhttp.send();
} 


function saveInputData(event, action){

    if(action === null || !(action == 'createUpdate' || action == 'delete'))
        return false;
    
    let parent = event.target.parentNode;
    // get element type 
    let elemnetType = null;
    let parentId = null;
    let id = null;
    
    switch (parent.nodeName) {
        case 'H2':
            elemnetType = 'chp';
            id = parent.closest('div.wrapper').getAttribute('id');
            parentId =  parent.closest('div.wrapper').parentNode.getAttribute('id');
            break;
        case 'H3':
            elemnetType = 'subchp';
            id = parent.closest('div.wrapper').getAttribute('id');
            parentId = event.target.closest('div.wrapper').parentNode.closest('div.wrapper').getAttribute('id');
            break;
        case 'P':
            elemnetType = 'p';
            id = parent.getAttribute('id');
            parentId = event.target.closest('div.wrapper').getAttribute('id');
            break;
    
        default:
            break;
    }
    
    if(action == 'delete'){
        id = event.target.getAttribute('data-delete-target');
        console.log(typeof(id));
        
        if(id.indexOf('chp')== 0){
            elemnetType = 'chp';
        }else if(id.indexOf('schp')== 0){
            elemnetType = 'subchp';
        }else if(id.indexOf('p')== 0){
            elemnetType = 'p';
        }else{
            elemnetType = null;
        }
    }

    let dataContent = event.target.value;

    let sendable = {
        'action':action,
        'elData':{
            'parentId': parentId,
            'id': id,
            'type': elemnetType,
            'cnt': dataContent,
            'pos': 0
        }
    };

    //console.log(sendable);
    //send data to server
    sendDataToServer('builder.php', sendable);
    
}

function sendDataToServer(url, data){

    let type = 'POST';
    let contentType = 'application/json';

    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-Type", contentType);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //var json = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
        }
    };

    var d = JSON.stringify(data);   
    xhr.send(d);

}


document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
    loadDocumentData();
});


function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}