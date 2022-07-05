import React, { useContext, useEffect, useState } from 'react';
import TasksContext from '../../../store/TasksContext';
import Modal from '../../ui/modal/Modal';
import NewTask from '../newTask/NewTask';
import classes from './ListItem.module.css';
import Options from './options/Options';

function TaskCard(props) {

    const [editing, setEditing] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [statusId, setStatusId] = useState({});

    const tasksCtx = useContext(TasksContext);

    useEffect(() => {
        setStatusId(props.task.statusId);
        getStatuses();
    }, []);

    function showModal() {
        setShowTask(true);
    }

    function hideModal() {
        setShowTask(false);
    }

    function toggleOptionsMenu() {
        setShowOptions(prev => !prev);
    }

    function getStatuses() {
        fetch(`${process.env.REACT_APP_DB_URL}/statuses`)
            .then(res => res.json())
            .then(data => setStatuses(data));
    }

    function changeStatus(e) {
        const newStatusId = e.target.value;

        if (newStatusId == props.task.id) return;

        setStatusId(newStatusId);
        let task = { ...props.task };
        task.statusId = newStatusId;
        tasksCtx.updateTask(task, true).then(() => hideModal());
    }

    function deleteTask() {
        tasksCtx.removeTask(props.task.id);
        hideModal();
    }

    function showEdit() {
        setEditing(true);
    }

    function hideEdit() {
        setEditing(false);
    }

    return (
        <React.Fragment>
            <li className={classes.task} onClick={showModal}>
                <p className={classes.title}>{props.task.title}</p>
            </li>
            {showTask && !editing && <Modal cancel={hideModal} >
                <div className={classes.modal}>
                    <div className={classes.header}>
                        <h4>{props.task.title}</h4>
                        <span onClick={toggleOptionsMenu} className={`material-icons ${classes.more}`}>more_vert</span>
                    </div>
                    {showOptions && <Options edit={showEdit} delete={deleteTask} />}
                    <p className={classes.description}>{props.task.description}</p>
                    <div className={classes.status}>
                        <label htmlFor='select'>Current Status</label>
                        <select id='select' value={statusId} onChange={changeStatus}>
                            {statuses.map(status => <option key={status.id} value={status.id}>{status.name}</option>)}
                        </select>
                    </div>
                </div>
            </Modal>}
            {showTask && editing && <NewTask hide={hideModal} editing={true} task={props.task} />}
        </React.Fragment>
    )
}

export default TaskCard;