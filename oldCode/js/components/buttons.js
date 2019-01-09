'use strict';
module.exports = {

    /**
     * Returns a button with preset attributes
     * @param {*} parentTarget 
     * @param {string} classList // space separated list accepted
     * @param {string} title
     * @param {string} innerHTML
     */
    BtnAddSection(parentTarget, classList, title, innerValue) {
        // param check
        classList = (typeof classList !== 'undefined' && typeof classList === 'string' ) ? classList : 'actionBtn section';
        title = (typeof title !== 'undefined' && typeof title === 'string' ) ? title : 'Add Section';
        var name = title.toLowerCase().replace(' ','_');
        innerValue = (typeof innerValue !== 'undefined' && typeof innerValue === 'string' ) ? innerValue : 'Add Section';

        //addSubChapter.setAttribute('onclick','addSubChapter(event)');
        return getDefBtn(parentTarget, classList, title, name, innerValue);
    },
    /**
     * Returns a button with preset attributes
     * @param {*} parentTarget 
     * @param {string} classList // space separated list accepted
     * @param {string} title
     * @param {string} innerHTML
     */
    BtnAddSubsection(parentTarget, classList, title, innerValue){
        // param check
        classList = (typeof classList !== 'undefined' && typeof classList === 'string' ) ? classList : 'actionBtn subsection';
        title = (typeof title !== 'undefined' && typeof title === 'string' ) ? title : 'Add SubSection';
        var name = title.toLowerCase().replace(' ','_');
        innerValue = (typeof innerValue !== 'undefined' && typeof innerValue === 'string' ) ? innerValue : 'Add SubSection';
        //addSubChapter.setAttribute('onclick','addSubChapter(event)');
        return getDefBtn(parentTarget, classList, title, name, innerValue);
    },
    /**
     * Returns a button with preset attributes
     * @param {*} parentTarget 
     * @param {string} classList // space separated list accepted
     * @param {string} title
     * @param {string} innerHTML
     */
    BtnAddParagraph(parentTarget, classList, title, innerValue){
        // param check
        classList = (typeof classList !== 'undefined' && typeof classList === 'string' ) ? classList : 'actionBtn paragraph';
        title = (typeof title !== 'undefined' && typeof title === 'string' ) ? title : 'Add Paragraph';
        var name = title.toLowerCase().replace(' ','_');
        innerValue = (typeof innerValue !== 'undefined' && typeof innerValue === 'string' ) ? innerValue : 'Add Paragraph';
        //prg.setAttribute('onclick','addParagraph(event)');
        return getDefBtn(parentTarget, classList, title, name, innerValue);
    },

    BtnRemoveElement(target, title, innerValue){

        let btn = document.createElement('button');
        btn.classList = 'actionBtn delete';
        btn.setAttribute('data-delete-target', target );
        //btn.setAttribute('onclick','deleteElement(event)');
        btn.setAttribute('name','Delete');
        btn.setAttribute('title',title);
        btn.innerHTML = innerValue;

        return btn;    
    }

}

function getDefBtn(parentTarget, classList, title,name, innerValue){
    
    let btn = document.createElement('button');
    btn.classList = classList;
    btn.setAttribute('data-parent-target', parentTarget );
    btn.setAttribute('title',title);
    //btn.setAttribute('onclick','btn(event)');
    btn.setAttribute('name',name);
    btn.innerHTML = innerValue;

    return btn;
}
