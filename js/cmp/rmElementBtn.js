var btn = function(target, title, innerValue){

    let btn = document.createElement('button');
    btn.classList = 'actionBtn delete';
    btn.setAttribute('data-delete-target', target );
    btn.setAttribute('onclick','deleteElement(event)');
    btn.setAttribute('name','Delete');
    btn.setAttribute('title',title);
    btn.innerHTML = innerValue;

    return btn;   
};

exports.btn = btn;