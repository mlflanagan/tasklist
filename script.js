/*global window, document, localStorage, console */
(function () {
    'use strict';

    window.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById("task-form"),
            ul = document.getElementById("task-list");

        function addTask(taskText) {
            var li = document.createElement('li'),
                div = document.createElement("div"),
                a = document.createElement('a');

            li.setAttribute('draggable', true);
            li.classList.add('task-list-item');

            div.appendChild(document.createTextNode(taskText));
            div.classList.add('task-text');
            li.appendChild(div);

            a.classList.add('task-delete');
            li.appendChild(a);

            ul.appendChild(li);
        }

        function removeTask(li) {
            if (window.confirm('Delete "' + li.firstElementChild.innerText  + '"?')) {
                console.log(li.firstElementChild.innerText);
                ul.removeChild(li);
            }
        }

        /* function removeAllTasks() {
            while (ul.firstChild) {
                ul.removeChild(ul.lastChild);
            }
        } */

        function loadTasks() {
            var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(function (text) {
                addTask(text);
            });
        }

        function saveTasks() {
            var children = ul.children,
                taskArr = [],
                i;
            for (i = 0; i < children.length; i++) {
                taskArr.push(children[i].firstElementChild.innerText);
            }
            localStorage.setItem("tasks", JSON.stringify(taskArr));
        }

        // *** Event handlers ***
        ul.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                removeTask(e.target.parentNode);
                saveTasks();
            }
        });

        form.addEventListener('submit', function () {
            var input = document.getElementById("task-input");
            if (input.value !== '') {
                addTask(input.value);
                saveTasks();
                input.value = '';
            }
        });

        /* not needed any more since we now save on every add and delete
        window.addEventListener('beforeunload', saveTasks); */

        // load saved tasks, if any
        loadTasks();

        // for debugging only
        // localStorage.removeItem("tasks");
        // localStorage.clear();
    });
}());

