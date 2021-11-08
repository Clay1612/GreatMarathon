'use strict'
const TO_DO = 'To Do';
const IN_PROGRESS = 'In Progress';
const DONE = 'Done';

const list = {
    'create a task': 'In Progress',
    'make a bed': 'Done',
    'go to bath': 'In Progress',
    'write a post': 'To Do',
}

function addTask(task) {
    if (list[task] === undefined) {
        list[task] = null;
        changeStatus(task, TO_DO);
        return 'Task added';
    } else {
        return 'Error. Task is already added';
    }
}

function deleteTask(task) {
    if (list[task] === undefined) {
        return 'Task is not found';
    } else {
        delete list[task];
        return 'Task deleted';
    }
}

function changeStatus(task, status) {
    const isStatusValid = (status === TO_DO || status === IN_PROGRESS || status === DONE);

    if (!(list[task] === undefined) && isStatusValid) {
        list[task] = status;
        return 'Task changed';
    } else {
        return 'Task is not found';
    }
}

function showList() {
    console.log(TO_DO + ':');
    for (let key in list) {
        if (list[key] === TO_DO) {
            console.log('\t' + key);
        }
    }
    console.log(IN_PROGRESS + ':')
    for (let key in list) {
        if (list[key] === IN_PROGRESS) {
            console.log('\t' + key);
        }
    }
    console.log(DONE + ':')
    for (let key in list) {
        if (list[key] === DONE) {
            console.log('\t' + key);
        }
    }
}

// Tests
console.log( addTask('listen music') );
console.log( addTask('make a bed') );
console.log(list);
console.log( changeStatus('listen music', 'In Progress') );
console.log( changeStatus('go to gym', 'Done') );
console.log( changeStatus('go to bath', 'Done') );
console.log(list);
console.log( deleteTask('listen music') );
console.log( deleteTask('play football') );
console.log(list);
showList();