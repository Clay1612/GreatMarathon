import {inputs} from "./view.js";


/*
Необходимо реализовать следующий функционал:
1) При нажатии на + или enter создается новая задача, которая добавляется в ту или иную колонку,
в зависимости от приоритета. (классы high-priority и low-priority)
2) Value из input для создания задачи переносится в value text input новой задачи (класс add-task)
3) При нажатии на checkbox:
    3.1) У псевдоэлемента before меняется background на серый (.todolist__checkbox-field+label::before)
    3.2) У text input меняется background на серый (todolist__task)
    3.3) Таска становится неактивной
4) При нажатии на крестик в таске, данная таска удаляется.
*/