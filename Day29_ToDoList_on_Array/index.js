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
    try {
        if (isTaskInList(task)) {
            throw new Error('Error. Task is already added')
        }
        let newTask = {
            name: task,
            status: TO_DO,
            priority: priority,
        }
        if (!priority) newTask.priority = 'low';
        list.push(newTask);
        return 'task added';
    } catch (error) {
        return error.message;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

function deleteTask(task) {
    try {
        if ( !isTaskInList(task) ) {
            throw new NotFoundError('Task is not found');
        }
        let taskIndex = list.findIndex( function (item) {
            return item.name === task;
        })
        list.splice(taskIndex, 1);
        return 'Task deleted';
    } catch (error) {
        return error.message;
    }
}

function changeStatus(task, status) {
    const isStatusValid = (status === TO_DO || status === IN_PROGRESS || status === DONE);
    try {
        if ( isStatusValid && isTaskInList(task) ) {
            let taskIndex = list.findIndex( function (item) {
                return item.name === task;
            })
            list[taskIndex].status = status;
            return 'Task changed';
        } else {
            throw new Error('Status is not valid or task is not found');
        }
    } catch (error) {
        return error.message;
    }
}

function showList() {
    let toDoTasks = [];
    let inProgressTasks = [];
    let doneTasks = [];
    list.forEach( function (item) {
        switch (item.status) {
            case TO_DO:
                toDoTasks.push(item.name)
                break;
            case IN_PROGRESS:
                inProgressTasks.push(item.name)
                break;
            case DONE:
                doneTasks.push(item.name)
                break;
        }
    })
    toDoTasks = toDoTasks.join('\n \t');
    inProgressTasks = inProgressTasks.join('\n \t');
    doneTasks = doneTasks.join('\n \t');
    console.log( TO_DO + ': \n \t' + toDoTasks );
    console.log( IN_PROGRESS + ': \n \t' + inProgressTasks );
    console.log( DONE + ': \n \t' + doneTasks );
}

function showBy(taskValue) {
    switch (taskValue) {
        case 'status':
            showList();
            break;
        case 'priority':
            console.log('high:');
            for (let task of list) {
                if (task.priority === 'high') console.log('\t' + task.name);
            }
            console.log('low:');
            for (let task of list) {
                if (task.priority === 'low') console.log('\t' + task.name);
            }
            break;
        case undefined:
            console.log('Show by what?');
            break;
        default:
            console.log('Selected parameter is not valid')
    }
}

//Tests
showList();
console.log('-----------');
console.log( addTask('go to gym') );
console.log( addTask('go to gym') );
console.log( changeStatus('go to gym', 'In Progress') );
console.log( changeStatus('go to gym', 'Ready') );
console.log( changeStatus('go to bath', 'Done') );
console.log( deleteTask('make a bed') );
console.log( deleteTask('make a bed') );
console.log('-----------');
showList();
console.log('-----------');
showBy('priority')
















