import {createNewTask, inputs} from "./view.js";
import { format } from 'date-fns';

const currentDate = document.querySelector('.header__date');
currentDate.textContent = format(new Date(), "do MMM");

for (let task of inputs.addNewTask) {
    task.addEventListener('submit', function () {
        let currentTask = undefined;
        if ( task.classList.contains('high-priority') ) {
            currentTask = createNewTask(inputs.newTaskValue[0].value);
            task.after(currentTask);
            inputs.newTaskValue[0].value = '';
        } else if ( task.classList.contains('low-priority') ) {
            currentTask = createNewTask(inputs.newTaskValue[1].value)
            task.after(currentTask);
            inputs.newTaskValue[1].value = '';
        }

        const deleteTaskButton = currentTask.querySelector('.todolist__delete-button');

        deleteTaskButton.addEventListener('click', function () {
            currentTask.remove();
        })

        const doneCheckBoxLabel = currentTask.querySelector('.todolist__checkbox-label');
        const taskValue = currentTask.querySelector('.todolist__text-field');

        doneCheckBoxLabel.addEventListener('click', function () {
            doneCheckBoxLabel.classList.toggle('active');
            taskValue.classList.toggle('active');
        })
    })
}