/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/buttons.js":
/*!**************************************!*\
  !*** ./src/js/components/buttons.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports = {\n\n    /**\n     * Returns a button with preset attributes\n     * @param {*} parentTarget \n     * @param {string} classList // space separated list accepted\n     * @param {string} title\n     * @param {string} innerHTML\n     */\n    BtnAddSection(parentTarget, classList, title, innerValue) {\n        // param check\n        classList = (typeof classList !== 'undefined' && typeof classList === 'string' ) ? classList : 'actionBtn section';\n        title = (typeof title !== 'undefined' && typeof title === 'string' ) ? title : 'Add Section';\n        var name = title.toLowerCase().replace(' ','_');\n        innerValue = (typeof innerValue !== 'undefined' && typeof innerValue === 'string' ) ? innerValue : 'Add Section';\n\n        //addSubChapter.setAttribute('onclick','addSubChapter(event)');\n        return getDefBtn(parentTarget, classList, title, name, innerValue);\n    },\n    /**\n     * Returns a button with preset attributes\n     * @param {*} parentTarget \n     * @param {string} classList // space separated list accepted\n     * @param {string} title\n     * @param {string} innerHTML\n     */\n    BtnAddSubsection(parentTarget, classList, title, innerValue){\n        // param check\n        classList = (typeof classList !== 'undefined' && typeof classList === 'string' ) ? classList : 'actionBtn subsection';\n        title = (typeof title !== 'undefined' && typeof title === 'string' ) ? title : 'Add SubSection';\n        var name = title.toLowerCase().replace(' ','_');\n        innerValue = (typeof innerValue !== 'undefined' && typeof innerValue === 'string' ) ? innerValue : 'Add SubSection';\n        //addSubChapter.setAttribute('onclick','addSubChapter(event)');\n        return getDefBtn(parentTarget, classList, title, name, innerValue);\n    },\n    /**\n     * Returns a button with preset attributes\n     * @param {*} parentTarget \n     * @param {string} classList // space separated list accepted\n     * @param {string} title\n     * @param {string} innerHTML\n     */\n    BtnAddParagraph(parentTarget, classList, title, innerValue){\n        // param check\n        classList = (typeof classList !== 'undefined' && typeof classList === 'string' ) ? classList : 'actionBtn paragraph';\n        title = (typeof title !== 'undefined' && typeof title === 'string' ) ? title : 'Add Paragraph';\n        var name = title.toLowerCase().replace(' ','_');\n        innerValue = (typeof innerValue !== 'undefined' && typeof innerValue === 'string' ) ? innerValue : 'Add Paragraph';\n        //prg.setAttribute('onclick','addParagraph(event)');\n        return getDefBtn(parentTarget, classList, title, name, innerValue);\n    },\n\n    BtnRemoveElement(target, title, innerValue){\n\n        let btn = document.createElement('button');\n        btn.classList = 'actionBtn delete';\n        btn.setAttribute('data-delete-target', target );\n        //btn.setAttribute('onclick','deleteElement(event)');\n        btn.setAttribute('name','Delete');\n        btn.setAttribute('title',title);\n        btn.innerHTML = innerValue;\n\n        return btn;    \n    }\n\n}\n\nfunction getDefBtn(parentTarget, classList, title,name, innerValue){\n    \n    let btn = document.createElement('button');\n    btn.classList = classList;\n    btn.setAttribute('data-parent-target', parentTarget );\n    btn.setAttribute('title',title);\n    //btn.setAttribute('onclick','btn(event)');\n    btn.setAttribute('name',name);\n    btn.innerHTML = innerValue;\n\n    return btn;\n}\n\n//# sourceURL=webpack:///./src/js/components/buttons.js?");

/***/ }),

/***/ "./src/js/components/paragraph.js":
/*!****************************************!*\
  !*** ./src/js/components/paragraph.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n//import util from './utils/utils';\nconst util = __webpack_require__(/*! ../utils/utils */ \"./src/js/utils/utils.js\");\n\nmodule.exports = {\n    newParagraph(event, trg) {\n        let parentId = null;\n        let id = null;\n        let cnt = '';\n        let parent = null;\n\n        if(event !== null){\n            parentId = event.target.getAttribute('data-parent-target');\n            id = 'p'+ util.getNewNumericId();\n            parent = document.getElementById(parentId);\n        }else{\n            parentId = trg.parentId;\n            id = trg.id;\n            cnt = trg.cnt;\n            //get parent contentArea \n            let cntAreas = document.getElementById(parentId).getElementsByClassName('cnt');\n            parent = cntAreas[0];\n        }\n    \n        if(parentId === null || id === null )\n            return false\n    \n        let prgInput = document.createElement('p');\n        prgInput.id = id;\n    \n        let txt = document.createElement('textarea');\n        if ( cnt != ''){\n            txt.innerHTML = cnt;\n        }\n        txt.setAttribute('placeholder','Insert your text here...');\n        //txt.setAttribute('onkeyup',\"auto_grow(this)\");\n        txt.addEventListener('keyup',this.auto_grow);\n\n        //txt.addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);\n    \n        prgInput.appendChild(txt);\n        //return prgInput;\n        return {\n            \"parentTarget\": parentId,\n            \"id\": id,\n            \"htmlElem\": prgInput\n        } \n    },\n    auto_grow(element) {\n        if(typeof element.style !== 'undefined' ){\n            element.style.height = \"5px\";\n            element.style.height = (element.scrollHeight)+\"px\";\n        }else if(typeof element.originalTarget.style !== 'undefined'){\n            element.originalTarget.style.height = \"5px\";\n            element.originalTarget.style.height = (element.originalTarget.scrollHeight)+\"px\";\n        }\n    \n    }\n}\n\n/* function auto_grow(element) {\n    if(typeof element.style !== 'undefined' ){\n        element.style.height = \"5px\";\n        element.style.height = (element.scrollHeight)+\"px\";\n    }else if(typeof element.originalTarget.style !== 'undefined'){\n        element.originalTarget.style.height = \"5px\";\n        element.originalTarget.style.height = (element.originalTarget.scrollHeight)+\"px\";\n    }\n\n} */\n\n\n//# sourceURL=webpack:///./src/js/components/paragraph.js?");

/***/ }),

/***/ "./src/js/components/section.js":
/*!**************************************!*\
  !*** ./src/js/components/section.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst util = __webpack_require__(/*! ../utils/utils.js */ \"./src/js/utils/utils.js\");\n\nmodule.exports = {\n    newSection(event, trg){\n        \n        // get html element id\n        let parentId = null;\n        let id =  null;\n        let cnt = '';\n        if(event !== null ){\n            parentId = event.target.getAttribute('data-parent-target');\n            id = 'sec'+util.getNewNumericId();\n        }\n        else{\n            parentId = trg.parentId;\n            id = trg.id;\n            cnt = trg.cnt;\n        }\n\n        //check parentId is not null \n        if(parentId === null || id === null)\n            return false;\n\n        // create chapter wrapper\n        var chapter = document.createElement('div');    \n        chapter.id = id;\n        chapter.classList = 'sectionWrapper wrapper';\n        \n        // chapter components\n            let chapterTitle = document.createElement('h2');\n            chapterTitle.classList = 'sectionTitle';\n            //chapterTitle.setAttribute('id',chapter.id +'-title');\n            // chapterTitle.innerHTML = '<input type=\"text\" id=\"'+chapter.id +'-title\" placeholder=\"Chapter title\">';\n            \n                let inpt = document.createElement('input');\n                inpt.setAttribute('type','text');\n                if( cnt != '') {\n                    inpt.setAttribute('value', cnt);\n                }\n                inpt.setAttribute('placeholder',\"Section title\");\n                //inpt.addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);\n                chapterTitle.appendChild(inpt);\n                \n            // add chapter title to chapter\n            chapter.appendChild(chapterTitle);\n\n            let contentArea = document.createElement('div');\n            contentArea.id = chapter.id + '-cnt' + util.getNewNumericId();\n            contentArea.classList = 'cnt';\n            chapter.appendChild(contentArea);\n\n            //get action btns, 'add subchapte, add paragraph, etc'\n            //let btnActions = actionBtns(contentArea.id, 1);\n\n            //chapter.appendChild(btnActions);\n        \n        //return element \n        return {\n            \"parentTarget\": parentId,\n            \"id\": id,\n            \"htmlElem\": chapter\n        }        \n        //return chapter;\n    }\n}\n\n//# sourceURL=webpack:///./src/js/components/section.js?");

/***/ }),

/***/ "./src/js/components/subsection.js":
/*!*****************************************!*\
  !*** ./src/js/components/subsection.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst util = __webpack_require__(/*! ../utils/utils.js */ \"./src/js/utils/utils.js\")\n\nmodule.exports = {\n    newSubsection(event, trg){\n        let parentId = null;\n        let id = null;\n        let cnt = '';\n        let parent = null;\n        if(event !== null){\n            parentId = event.target.getAttribute('data-parent-target');\n            id = 'subsec'+ util.getNewNumericId();\n            parent = document.getElementById(parentId);\n        }else{\n            parentId = trg.parentId;\n            id = trg.id;\n            cnt = trg.cnt;\n            //get parent contentArea \n            let cntAreas = document.getElementById(parentId).getElementsByClassName('cnt');\n            parent = cntAreas[0];\n        }\n\n        if(parentId === null || id === null || parent === null)\n            return false\n        \n        let subChapter = document.createElement('div');\n        subChapter.classList = 'subSection wrapper';\n        subChapter.id = id;\n        \n        // subchapter components\n            //add subchapter title (h3)\n            let subChapterTitle = document.createElement('h3');\n            subChapterTitle.classList = 'subSectionTitle';\n            //subChapterTitle.setAttribute('id',subChapter.id +'-title');\n            // subChapterTitle.innerHTML = '<input type=\"text\" id=\"'+subChapter.id +'-title\" placeholder=\"SubChapter title\">';\n                let inpt = document.createElement('input');\n                inpt.setAttribute('type','text');\n                if( cnt != '') {\n                    inpt.setAttribute('value', cnt);\n                }\n                inpt.setAttribute('placeholder',\"SubSection title\"); \n                //inpt.addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);\n                subChapterTitle.appendChild(inpt);\n            \n            // add chapter title to chapter\n            subChapter.appendChild(subChapterTitle);\n\n            //add content area \n            let contentArea = document.createElement('div');\n            contentArea.id = subChapter.id + '-subCnt';\n            //contentArea.classList = 'subChapterCnt';\n            contentArea.classList = 'cnt';\n            subChapter.appendChild(contentArea);\n\n        //return subChapter;\n        return {\n            \"parentTarget\": parentId,\n            \"id\": id,\n            \"htmlElem\": subChapter\n        } \n    }\n}\n\n//# sourceURL=webpack:///./src/js/components/subsection.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_buttons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/buttons */ \"./src/js/components/buttons.js\");\n/* harmony import */ var _components_buttons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_buttons__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/section */ \"./src/js/components/section.js\");\n/* harmony import */ var _components_section__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_section__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_subsection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/subsection */ \"./src/js/components/subsection.js\");\n/* harmony import */ var _components_subsection__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_subsection__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_paragraph__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/paragraph */ \"./src/js/components/paragraph.js\");\n/* harmony import */ var _components_paragraph__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_paragraph__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _utils_toserver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/toserver */ \"./src/js/utils/toserver.js\");\n/* harmony import */ var _utils_toserver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_utils_toserver__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n\nvar page = document.querySelector('#page');\nvar addSectionBtn = _components_buttons__WEBPACK_IMPORTED_MODULE_0___default.a.BtnAddSection('docRoot');\n//addSectionBtn.setAttribute('onclick', \"newSection(event)\");\naddSectionBtn.addEventListener('click',newSection);\npage.appendChild(addSectionBtn);\n\n// buttons wrapper\n/**\n * return the bntBar with the action buttons\n * @param {string} parentTarget parent container where to add the btnBar\n * @param {string} parentType element type that's beeing added to DOM 'sec || subsec || p '\n */\nfunction getActionBtns(parentTarget, parentType) {\n\n    let btns = []; \n    let ok = true;\n    switch(parentType){\n        case 'sec':\n            // addSubsection, addParagraph, deleteSection\n            var subsec = _components_buttons__WEBPACK_IMPORTED_MODULE_0___default.a.BtnAddSubsection(parentTarget);\n            //subsec.setAttribute('onclick',\"newSubsection(event)\");\n            subsec.addEventListener('click',newSubsection);\n            btns.push(subsec);\n\n            var para = _components_buttons__WEBPACK_IMPORTED_MODULE_0___default.a.BtnAddParagraph(parentTarget); \n            //para.setAttribute('onclick','newParagraph(event)');\n            para.addEventListener('click', newParagraph)\n            btns.push(para);\n\n            var del = _components_buttons__WEBPACK_IMPORTED_MODULE_0___default.a.BtnRemoveElement(parentTarget,'Delete this section, ATTENTION all subsection and paragraphd will be also deleted', 'Delete Section' );\n            //del.setAttribute('onclick','RemoveElement(event)');\n            del.addEventListener('click',RemoveElement);\n            btns.push(del);\n            \n            break;\n        case 'subsec':\n\n            var para = _components_buttons__WEBPACK_IMPORTED_MODULE_0___default.a.BtnAddParagraph(parentTarget); \n            para.addEventListener('click', newParagraph)\n            btns.push(para);\n\n            var del = _components_buttons__WEBPACK_IMPORTED_MODULE_0___default.a.BtnRemoveElement(parentTarget,'Delete this subsection, ATTENTION all paragraphd will be also deleted', 'Delete SubSection'  );\n            del.addEventListener('click',RemoveElement);\n            btns.push(del);\n            \n            break;\n\n        case 'p':\n        \n            var del = _components_buttons__WEBPACK_IMPORTED_MODULE_0___default.a.BtnRemoveElement(parentTarget,'Delete this paragraph', 'Delete paragraph' );\n            del.addEventListener('click',RemoveElement);\n            btns.push(del);\n            \n            break;\n        default:\n            ok = false;\n            break;\n\n    }\n\n    if(!ok){\n        console.log('invalid type in actionBtns().... check input file');\n        return '';\n    }\n    if(btns.length < 1 ){\n        console.log('no btns in array.....');\n        return '';\n    }\n\n    // action btns wrapper\n    let btnActions = document.createElement('div');\n    btnActions.classList = \"chpBtnWrapper\";\n\n    for (let i = 0; i < btns.length; i++) {\n        btnActions.appendChild(btns[i]);\n    }\n\n    return btnActions;\n}\n\n// buttons onclick events\nfunction newSection(event, trg){    \n    var sec = _components_section__WEBPACK_IMPORTED_MODULE_1___default.a.newSection(event,trg);\n    sec.htmlElem.appendChild(getActionBtns(sec.id, 'sec'));\n    sec.htmlElem.querySelector('input').addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);\n    document.querySelector('#'+sec.parentTarget).appendChild(sec.htmlElem);\n    return;\n}\n\nfunction newSubsection(event, trg){    \n    var subsec = _components_subsection__WEBPACK_IMPORTED_MODULE_2___default.a.newSubsection(event,trg);\n    subsec.htmlElem.appendChild(getActionBtns(subsec.id, 'subsec'));\n    subsec.htmlElem.querySelector('input').addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);\n    var parent = document.querySelector('#'+subsec.parentTarget);\n    parent.querySelector('.cnt').appendChild(subsec.htmlElem);\n    return;\n}\nfunction newParagraph(event, trg){    \n    var p = _components_paragraph__WEBPACK_IMPORTED_MODULE_3___default.a.newParagraph(event,trg);\n    p.htmlElem.appendChild(getActionBtns(p.id, 'p'));\n    p.htmlElem.querySelector('textarea').addEventListener('blur', function(event){ saveInputData(event, 'createUpdate')},false);\n    var parent = document.querySelector('#'+p.parentTarget);\n    parent.querySelector('.cnt').appendChild(p.htmlElem);\n    return;\n}\nfunction RemoveElement(event) {\n    return;\n}\n\nfunction buildWorkingPage(data){\n    console.log(data);\n    \n    var cmp = data.elements;\n    console.log(cmp);\n    \n    //set document title\n    document.getElementById('docTitle').setAttribute('value', data.docTitle);\n    //generate documento form json\n    cmp.forEach(element => {\n        switch(element.type){\n            case \"sec\": \n                newSection(null, element);\n                break;\n            case \"subsec\":\n                newSubsection(null, element);\n                break;\n            case \"p\":\n                newParagraph(null, element);\n                break;\n            default:\n                break;\n        } \n    });\n\n    //make all text areas big to fit content\n    let els = document.querySelectorAll(\"textarea\");\n    els.forEach(function(el){        \n        _components_paragraph__WEBPACK_IMPORTED_MODULE_3___default.a.auto_grow(el);\n    });\n}\n\n\nfunction saveInputData(event, action){\n\n    if(action === null || !(action == 'createUpdate' || action == 'delete'))\n        return false;\n    \n    let parent = event.target.parentNode;\n    // get element type \n    let elemnetType = null;\n    let parentId = null;\n    let id = null;\n    \n    switch (parent.nodeName) {\n        case 'H2':\n            elemnetType = 'sec';\n            id = parent.closest('div.wrapper').getAttribute('id');\n            parentId =  parent.closest('div.wrapper').parentNode.getAttribute('id');\n            break;\n        case 'H3':\n            elemnetType = 'subsec';\n            id = parent.closest('div.wrapper').getAttribute('id');\n            parentId = event.target.closest('div.wrapper').parentNode.closest('div.wrapper').getAttribute('id');\n            break;\n        case 'P':\n            elemnetType = 'p';\n            id = parent.getAttribute('id');\n            parentId = event.target.closest('div.wrapper').getAttribute('id');\n            break;\n    \n        default:\n            break;\n    }\n    \n    if(action == 'delete'){\n        id = event.target.getAttribute('data-delete-target');\n        console.log(typeof(id));\n        \n        if(id.indexOf('sec')== 0){\n            elemnetType = 'sec';\n        }else if(id.indexOf('subsec')== 0){\n            elemnetType = 'subsec';\n        }else if(id.indexOf('p')== 0){\n            elemnetType = 'p';\n        }else{\n            elemnetType = null;\n        }\n    }\n\n    let dataContent = event.target.value;\n\n    let sendable = {\n        'action':action,\n        'elData':{\n            'parentId': parentId,\n            'id': id,\n            'type': elemnetType,\n            'cnt': dataContent,\n            'pos': 0\n        }\n    };\n\n    //console.log(sendable);\n    //send data to server\n    _utils_toserver__WEBPACK_IMPORTED_MODULE_4___default.a.sendDataToServer('/simpleDocBuilder/builder.php', sendable);\n    \n}\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function(event) { \n    //do work\n    var resp = { \"data\":null };\n    _utils_toserver__WEBPACK_IMPORTED_MODULE_4___default.a.loadDocumentData(\"/simpleDocBuilder/builder.php\", resp);\n\n    // @todo => find a better way todo this\n    function lookForResp(){        \n        if(typeof resp.data !== 'null' && typeof resp.data !== 'undefined'){\n            buildWorkingPage(resp.data);\n            clearInterval(itervalId);\n        }\n    }\n\n    var itervalId = setInterval(lookForResp, 100);\n\n\n});\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/js/utils/toserver.js":
/*!**********************************!*\
  !*** ./src/js/utils/toserver.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n    loadDocumentData(url, resp) {\n        //load json file with data from server\n        var xmlhttp = new XMLHttpRequest();\n        xmlhttp.onreadystatechange = function() {\n            if (this.readyState == 4 && this.status == 200) {\n                var rs = JSON.parse(this.responseText);\n                //console.log(rs);\n                //buildWorkingPage(rs);\n                resp.data = rs;\n            }\n        };\n        xmlhttp.open(\"GET\", url, true);\n        xmlhttp.send();\n    },\n    sendDataToServer(url, data){\n\n        let type = 'POST';\n        let contentType = 'application/json';\n    \n        var xhr = new XMLHttpRequest();\n        xhr.open(type, url, true);\n        xhr.setRequestHeader(\"Content-Type\", contentType);\n    \n        xhr.onreadystatechange = function () {\n            if (xhr.readyState === 4 && xhr.status === 200) {\n                //var json = JSON.parse(xhr.responseText);\n                console.log(xhr.responseText);\n            }\n        };\n    \n        var d = JSON.stringify(data);   \n        xhr.send(d);\n    \n    }\n}\n\n//# sourceURL=webpack:///./src/js/utils/toserver.js?");

/***/ }),

/***/ "./src/js/utils/utils.js":
/*!*******************************!*\
  !*** ./src/js/utils/utils.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n    /**\n     * Returns a numeric id based on current date\n     */\n    getNewNumericId(){\n        return Math.floor(new Date().getTime()/1000);\n    }\n}\n\n//# sourceURL=webpack:///./src/js/utils/utils.js?");

/***/ })

/******/ });