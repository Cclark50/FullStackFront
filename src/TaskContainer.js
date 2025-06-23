import {useTasks} from './useTasks';
import {InputBoxes} from './InputBoxes';
import {TaskList} from './TaskList';

export function TaskContainer() {
    const {taskList, addTask, loadTasks, printall, namebox, descriptionbox, setDescriptionbox, setNamebox, ToggleTaskCompletion, deleteTask} = useTasks()

    return (
        <div>
            <InputBoxes
                namebox = {namebox}
                setNamebox = {setNamebox}
                descriptionbox = {descriptionbox}
                setDescriptionbox = {setDescriptionbox}
                addTask = {addTask}
                loadTasks = {loadTasks}
                printall = {printall}
            />
            <TaskList
                tasks ={ taskList }
                ToggleTaskCompletion = {ToggleTaskCompletion}
                deleteTask = {deleteTask}
            />
        </div>
    )
}

export default TaskContainer;