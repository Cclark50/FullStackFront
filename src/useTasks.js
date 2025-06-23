import {useEffect, useState} from "react";

const SERVER_URL = "http://localhost:5235/api";
const TASK_URL = "/tasks/";

export function useTasks(){
    const [taskList, setTaskList] = useState([]);
    const [descriptionbox, setDescriptionbox] = useState('');
    const [namebox, setNamebox] = useState('');

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
                const index = newList.findIndex((item) => item.id === id);
                newList[index] = data;
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
                    console.log("updated list: ", newList);
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
                console.log(response);
                throw new Error("Failed to delete task");
            }
            const index = taskList.findIndex((item) => item.id === id);
            setTaskList((prev) =>{
                console.log("inside settasklist");
                const newList = [...prev];
                newList.splice(index, 1);
                return newList;
            })
        }catch(error){
            console.log(error);
        }
    }


    async function printall(){
        console.log(taskList);
        await fetch('http://localhost:5235/api/value');
    }


    return {taskList, addTask, loadTasks, printall, namebox, descriptionbox, setNamebox, setDescriptionbox, ToggleTaskCompletion, deleteTask};
}
