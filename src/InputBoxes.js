
export function InputBoxes({namebox, descriptionbox, setNamebox, setDescriptionbox, addTask, loadTasks, printall}) {

    return(
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
    )
}

export default InputBoxes;