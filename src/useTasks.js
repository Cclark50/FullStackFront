import {useEffect, useState} from "react";

const SERVER_URL = "http://localhost:5235/api";
const TASK_URL = "/tasks/";

export function useTasks(){
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks(){
        try{
            const response = await fetch(SERVER_URL + TASK_URL);
            const data = await response.json();
            setTaskList(data);
        }catch(error){
            console.log(error);
        }
    }

    async function ToggleTaskCompletion(id){
        try{
            const response = await fetch(SERVER_URL + TASK_URL + id.toString() + "/Complete",{
                method: "PUT"
            });
            const data = await response.json();
            console.log(data);
            setTaskList((prev) =>{
                const newList =  [...prev];
                newList[id] = data;
                return newList;
            }
            );
        }catch (error){
            console.log(error);
        }
    }

    async function addTask(task){
        console.log("Adding task");
        console.log(task);
        if(!task.namebox || !task.descriptionbox || task.namebox === "" || task.descriptionbox === ""){
            console.log("did not work");
            console.log(task);
            return "Invalid data";
        }
        try{
            const response = await fetch(SERVER_URL + TASK_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: task.namebox,
                    desc: task.descriptionbox,
                })
            });
            console.log(response);
            if(!response.ok){
                throw new Error("Failed to add task");
            }
            const data = await response.json();
            console.log(data);
            setTaskList((prev) =>{
                    const newList = [...prev];
                    const newtask = { id: data.id, title: data.title, description: data.description, isCompleted: data.isCompleted };
                    newList.push(newtask);
                    return newList;
                }
            );
        }catch(error){
            console.log(error);
        }
    }

    async function deleteTask(id){
        console.log("Delete task");
        try{
            const response = await fetch(SERVER_URL + TASK_URL + id.toString(), {
                method: "DELETE",
            })
            if(!response.ok){
                throw new Error("Failed to delete task");
            }
            setTaskList((prev) =>{
                const newList = [...prev];
                newList.splice(id, 1);
                return newList;
            })
        }catch(error){
            console.log(error);
        }
    }

    return {taskList, ToggleTaskCompletion, addTask, deleteTask, loadTasks};
}


export function TaskList({tasks, ToggleTaskCompletion, deleteTask}){
    if(!tasks) return <p>Loading...</p>;
    if(tasks.length === 0) return <p>No tasks found</p>;
    return <div>
        <ul>
            {tasks.map((task)=>(
                <li key={task.id}>
                    <span onClick={() => ToggleTaskCompletion(task.id)}>{task.title} | {task.description} |</span>
                    <input type="checkbox" checked={task.isCompleted} disabled></input>
                    <span onClick={() => deleteTask(task.id)}>Delete Task</span>
                </li>
            ))}
        </ul>
    </div>
}
