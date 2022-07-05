import { createContext, useContext, useEffect, useState } from "react";
import CurrentBoardContext from "./CurrentBoardContext";

const TasksContext = createContext({
    tasks: [],
    getTasks: (statusId) => { },
    addTask: (task) => { },
    removeTask: (id) => { },
    updateTask: (task) => { }
})

export function TasksContextProvider(props) {

    const [tasks, setTasks] = useState([]);
    const currentBoardCtx = useContext(CurrentBoardContext);

    useEffect(() => {
        fetchTasks()
    }, [currentBoardCtx.board.id]);

    function fetchTasks() {
        fetch(`http://localhost:3000/tasks?boardId=${currentBoardCtx.board.id}`)
            .then(res => res.json())
            .then(data => setTasks(data));
    }

    async function addTask(task) {
        let res = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        let data = await res.json();

        setTasks(prev => {
            const list = [...prev];
            list.push(data);
            return list
        })

    }

    async function removeTask(id) {
        let res = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let data = await res.json();
        setTasks(prev => {
            let list = [...prev];
            list = list.filter(item => item.id != id);
            return list;
        })
    }

    async function updateTask(task, statusChanged = false) {

        if (statusChanged) {
            removeTask(task.id).then(() => addTask(task));
        }
        else {
            let res = await fetch(`http://localhost:3000/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            })
            let data = await res.json();

            setTasks(prev => {
                let newTasks = [...prev]
                newTasks = newTasks.map(t => {
                    if (task.id == t.id) return { ...data }
                    else return t
                })
                return newTasks;
            })

            return data;
        }

    }

    function getTasks(statusId) {
        return tasks.filter(task => task.statusId == statusId);
    }


    let context = {
        tasks,
        getTasks,
        removeTask,
        addTask,
        updateTask
    }

    return (
        <TasksContext.Provider value={context}>
            {props.children}
        </TasksContext.Provider>
    )
}

export default TasksContext;