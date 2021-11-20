'use strict'
const TO_DO = 'To Do';
const IN_PROGRESS = 'In Progress';
const DONE = 'Done';

const list = [
    {
        name: 'create a task',
        status: 'In Progress',
        priority: 'low',
    },
    {
        name: 'make a bed',
        status: 'Done',
        priority: 'low',
    },
    {
        name: 'write a post',
        status: 'To Do',
        priority: 'high',
    }

];

function isTaskInList(task) {
    let foundTask = list.find( function (item) {
        return item.name === task;
    })
    return list.includes(foundTask);
}

function addTask(task, priority) {
    if ( !isTaskInList(task) ) {
        let newTask = {
            name: task,
            status: TO_DO,
            priority: priority,
        }
        if (!priority) newTask.priority = 'low';
        list.push(newTask);
        return 'task added';
    } else {
        return 'Error. Task is already added';
    }
}

function deleteTask(task) {
    if ( isTaskInList(task) ) {
        let taskIndex = list.findIndex( function (item) {
            return item.name === task;
        })
        list.splice(taskIndex, 1);
        return 'Task deleted';
    } else {
        return 'Task is not found';
    }
}

function changeStatus(task, status) {
    const isStatusValid = (status === TO_DO || status === IN_PROGRESS || status === DONE);
    if ( isStatusValid && isTaskInList(task) ) {
        let taskIndex = list.findIndex( function (item) {
            return item.name === task;
        })
        list[taskIndex].status = status;
        return 'Task changed';
    } else {

    }
    return 'Status is not valid';
}