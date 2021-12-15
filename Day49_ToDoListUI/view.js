export const inputs = {
    addNewTask: document.querySelectorAll('.todolist__add-task-field'),
    newTaskValue: document.querySelectorAll('.todolist__newText-field'),
}

export function createNewTask(taskValue) {
    let newTask = document.createElement('form');
    newTask.className = 'todolist__task';

    let doneCheckBox = document.createElement('input');
    doneCheckBox.type = 'checkbox';
    doneCheckBox.className = 'todolist__checkbox-field';
    doneCheckBox.id = 'done-checkbox';

    let doneCheckBoxLabel = document.createElement('label');
    doneCheckBoxLabel.for = 'done-checkbox';
    doneCheckBoxLabel.className = 'todolist__checkbox-label';

    let taskText = document.createElement('input');
    taskText.type = 'text';
    taskText.className = 'todolist__text-field';
    taskText.value = taskValue;
    taskText.disabled = true;

    let deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.className = 'todolist__delete-button';

    newTask.append( doneCheckBox, doneCheckBoxLabel, taskText, deleteButton );

    return newTask;
}