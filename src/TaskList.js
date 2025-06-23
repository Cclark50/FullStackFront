import completedpng from './wwwroot/Complete.png'
import notcompletepng from './wwwroot/NotComplete.png'

export function TaskList({tasks, ToggleTaskCompletion, deleteTask}){
    if(!tasks) return <p>Loading...</p>;
    if(tasks.length === 0) return <p>No tasks found</p>;
    return <div>
        <tbody>
        {tasks.map((task) => (
            <tr key={task.id} className="tablerows">
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td onClick={() => ToggleTaskCompletion(task.id)}>{task.isCompleted? <img src={completedpng} alt={"Complete"} width={32} height={32}/> : <img src={notcompletepng} alt={"Not Complete"} width={32} height={32}/> }</td>
                <td>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
            </tr>
        ))}
        </tbody>
    </div>
}

export default TaskList;
