import './App.css';
import {useTasks, TaskList} from './useTasks.js';
import {useState} from "react";


function App() {
    const {taskList, ToggleTaskCompletion, addTask, deleteTask, loadTasks} = useTasks();
    const [descriptionbox, setDescriptionbox] = useState('');
    const [namebox, setNamebox] = useState('');

    async function printall(){
        await fetch('http://localhost:5235/value');
    }

    return (
        <div className="App-header">
            <TaskList tasks={taskList} ToggleTaskCompletion={ToggleTaskCompletion} deleteTask={deleteTask}/>
            <div className="input-boxes">
                <input value={namebox} onChange={(e) => setNamebox(e.target.value)}/>
                <input value={descriptionbox} onChange={(e) => setDescriptionbox(e.target.value)}/>
                <button name={"addTask"} onClick={() => {
                    const task = {namebox, descriptionbox};
                    addTask(task);
                    }}>Add Task</button>
                <button name={"Reload List"} onClick={() => {loadTasks()}}>Reload List</button>
                <button name={"print all"} onClick={() => printall()} >Print All</button>
            </div>
        </div>
    );
}

export default App;
