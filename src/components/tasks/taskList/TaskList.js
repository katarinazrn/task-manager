import { useContext, useEffect, useState } from "react";
import CurrentBoardContext from "../../../store/CurrentBoardContext";
import TasksContext from "../../../store/TasksContext";
import ListItem from "../task/ListItem";
import classes from './TaskList.module.css';

function TaskList({ status }) {

    const [tasks, setTasks] = useState([]);
    const currentBoardCtx = useContext(CurrentBoardContext);
    const tasksCtx = useContext(TasksContext);

    useEffect(() => {
        getTasks();
    }, [status, currentBoardCtx.board.id, tasksCtx.tasks]);

    function getTasks() {
        let data = tasksCtx.getTasks(status.id);
        setTasks(data);
    }

    if (tasks.length <= 0) return ''

    return (
        <ul className={classes.list}>
            {tasks.map(task => <ListItem key={task.id} task={task} />)}
        </ul>
    )
}

export default TaskList;