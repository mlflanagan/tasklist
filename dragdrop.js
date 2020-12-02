'use strict';

var dragSourceElement = null;

function swap(elem1, elem2) {
    var temp = elem1.nextElementSibling;
    if (temp === elem2) {
        temp = elem1;
    }
    elem2.parentNode.insertBefore(elem1, elem2);
    elem1.parentNode.insertBefore(elem2, temp);
}

function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSourceElement = this;
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    e.stopPropagation();
    if (dragSourceElement !== this) {
        swap(dragSourceElement, this);
        saveTasks();
    }
    return false;
}

function handleDragEnd(e) {
    var items = document.getElementById('task-list').getElementsByTagName("li");
    this.style.opacity = '1';
    for (var i=0 ; i<items.length ; i++) {
        items[i].classList.remove('over');
    };
}

