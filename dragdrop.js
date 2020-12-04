'use strict';

var draggedItem = null;

function swap(elem1, elem2) {
    var temp = elem1.nextElementSibling;
    if (temp === elem2) {
        temp = elem1;
    }
    elem2.parentNode.insertBefore(elem1, elem2);
    elem1.parentNode.insertBefore(elem2, temp);
}

function handleDragStart(e) {
    draggedItem = this;
    draggedItem.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    /* 1. Do not highlight dragged item as target
       2. Only highlight target if over div element, not li element
    */
    if (e.target.tagName === "DIV") {
        if (e.target.parentElement !== draggedItem) {
            e.target.classList.add('target');
        }
    }
}

function handleDragLeave(e) {
    if (e.target.tagName === "DIV") {
        /* Do not remove highlight when dragging over target div children.
           - e.target is the div we are leaving
           - e.relatedTarget is the div child element we are entering
        */
        if (!e.target.contains(e.relatedTarget)) {
            e.target.classList.remove('target');
        }
    }
}

function handleDrop(e) {
    e.stopPropagation();
    if (draggedItem !== this) {
        swap(draggedItem, this);
        saveTasks();
    }
    e.target.classList.remove('target');
    return false;
}

function handleDragEnd(e) {
    draggedItem.classList.remove('dragging');
    draggedItem = null;
}

