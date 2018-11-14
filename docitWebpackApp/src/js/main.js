
import Buttons from './components/buttons';
import Section from './components/section';
import Subsection from './components/subsection';
import Paragraph from './components/paragraph';
import Serv from './utils/toserver';

var page = document.querySelector('#page');
var addSectionBtn = Buttons.BtnAddSection('docRoot');
//addSectionBtn.setAttribute('onclick', "newSection(event)");
addSectionBtn.addEventListener('click',newSection);
page.appendChild(addSectionBtn);

// buttons wrapper
/**
 * return the bntBar with the action buttons
 * @param {string} parentTarget parent container where to add the btnBar
 * @param {string} parentType element type that's beeing added to DOM 'sec || subsec || p '
 */
function getActionBtns(parentTarget, parentType) {

    let btns = []; 
    let ok = true;
    switch(parentType){
        case 'sec':
            // addSubsection, addParagraph, deleteSection
            var subsec = Buttons.BtnAddSubsection(parentTarget);
            //subsec.setAttribute('onclick',"newSubsection(event)");
            subsec.addEventListener('click',newSubsection);
            btns.push(subsec);

            var para = Buttons.BtnAddParagraph(parentTarget); 
            //para.setAttribute('onclick','newParagraph(event)');
            para.addEventListener('click', newParagraph)
            btns.push(para);

            var del = Buttons.BtnRemoveElement(parentTarget,'Delete this section, ATTENTION all subsection and paragraphd will be also deleted', 'Delete Section' );
            //del.setAttribute('onclick','RemoveElement(event)');
            del.addEventListener('click',RemoveElement);
            btns.push(del);
            
            break;
        case 'subsec':

            var para = Buttons.BtnAddParagraph(parentTarget); 
            para.addEventListener('click', newParagraph)
            btns.push(para);

            var del = Buttons.BtnRemoveElement(parentTarget,'Delete this subsection, ATTENTION all paragraphd will be also deleted', 'Delete SubSection'  );
            del.addEventListener('click',RemoveElement);
            btns.push(del);
            
            break;

        case 'p':
        
            var del = Buttons.BtnRemoveElement(parentTarget,'Delete this paragraph', 'Delete paragraph' );
            del.addEventListener('click',RemoveElement);
            btns.push(del);
            
            break;
        default:
            ok = false;
            break;

    }

    if(!ok){
        console.log('invalid type in actionBtns().... check input file');
        return '';
    }
    if(btns.length < 1 ){
        console.log('no btns in array.....');
        return '';
    }

    // action btns wrapper
    let btnActions = document.createElement('div');
    btnActions.classList = "chpBtnWrapper";

    for (let i = 0; i < btns.length; i++) {
        btnActions.appendChild(btns[i]);
    }

    return btnActions;
}

// buttons onclick events
function newSection(event, trg){    
    var sec = Section.newSection(event,trg);
    sec.htmlElem.appendChild(getActionBtns(sec.id, 'sec'));
    sec.htmlElem.querySelector('input').addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);
    document.querySelector('#'+sec.parentTarget).appendChild(sec.htmlElem);
    return;
}

function newSubsection(event, trg){    
    var subsec = Subsection.newSubsection(event,trg);
    subsec.htmlElem.appendChild(getActionBtns(subsec.id, 'subsec'));
    subsec.htmlElem.querySelector('input').addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);
    var parent = document.querySelector('#'+subsec.parentTarget);
    parent.querySelector('.cnt').appendChild(subsec.htmlElem);
    return;
}
function newParagraph(event, trg){    
    var p = Paragraph.newParagraph(event,trg);
    p.htmlElem.appendChild(getActionBtns(p.id, 'p'));
    p.htmlElem.querySelector('textarea').addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);
    var parent = document.querySelector('#'+p.parentTarget);
    parent.querySelector('.cnt').appendChild(p.htmlElem);
    return;
}

function RemoveElement(event) {
    saveInputData(event,'delete');
    let el = document.getElementById(event.target.getAttribute('data-delete-target'));
    el.parentNode.removeChild(el);
    return;
}

function composeDevPage(data){
    var cmp = data.elements;
    console.log(cmp);
    
    //set document title
    document.getElementById('docTitle').setAttribute('value', data.docTitle);
    //generate documento form json
    cmp.forEach(element => {
        switch(element.type){
            case "sec": 
                newSection(null, element);
                break;
            case "subsec":
                newSubsection(null, element);
                break;
            case "p":
                newParagraph(null, element);
                break;
            default:
                break;
        } 
    });

    //make all text areas big to fit content
    let els = document.querySelectorAll("textarea");
    els.forEach(function(el){        
        Paragraph.auto_grow(el);
    });
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
            elemnetType = 'sec';
            id = parent.closest('div.wrapper').getAttribute('id');
            parentId =  parent.closest('div.wrapper').parentNode.getAttribute('id');
            break;
        case 'H3':
            elemnetType = 'subsec';
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
        
        if(id.indexOf('sec')== 0){
            elemnetType = 'sec';
        }else if(id.indexOf('subsec')== 0){
            elemnetType = 'subsec';
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
    Serv.sendDataToServer('/simpleDocBuilder/builder.php', sendable);
    
}


document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
    var resp = { "data":null };
    Serv.loadDocumentData("/simpleDocBuilder/builder.php", resp);

    // @todo => find a better way todo this
    function lookForResp(){        
        if(typeof resp.data !== 'null' && typeof resp.data !== 'undefined'){
            composeDevPage(resp.data);
            clearInterval(itervalId);
        }
    }

    var itervalId = setInterval(lookForResp, 100);


});
