import classes from './NewTask.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import Modal from '../../ui/modal/Modal';
import CurrentBoardContext from '../../../store/CurrentBoardContext';
import TasksContext from '../../../store/TasksContext';

function NewTask(props) {

    const [statuses, setStatuses] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [statusId, setStatusId] = useState(0);

    const currentBoardCtx = useContext(CurrentBoardContext);
    const tasksCtx = useContext(TasksContext);

    useEffect(() => {
        getStatuses();

        if (props.editing) {
            setTitle(props.task.title);
            setDescription(props.task.description);
            setStatusId(props.task.statusId);
        }

    }, [props])

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleStatusIdChange(e) {
        setStatusId(e.target.value);
    }

    function getStatuses() {
        fetch(`${process.env.REACT_APP_DB_URL}/statuses`)
            .then(res => res.json())
            .then(data => {
                if (!props.editing) setStatusId(data[0].id)
                setStatuses(data)
            });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (props.editing) {
            editTask();
        }
        else {
            addTask();
        }

    }

    function editTask() {

        if (title.trim() === '') return;

        let task = {
            id: props.task.id,
            title,
            description,
            statusId,
            boardId: currentBoardCtx.board.id
        }

        let statusChanged = props.task.statusId != statusId;

        tasksCtx.updateTask(task, statusChanged).then(() => hideModal());
    }

    function addTask() {

        if (title.trim() === '') return;

        let task = {
            title,
            description,
            statusId,
            boardId: currentBoardCtx.board.id
        }

        tasksCtx.addTask(task).then(() => hideModal());
    }

    function hideModal() {
        props.hide();
    }

    return (
        <Modal cancel={hideModal}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h3 className={classes.title}>
                    {props.editing && 'Edit Task'}
                    {!props.editing && 'Add New Task'}
                </h3>
                <div className={classes['form-control']}>
                    <label htmlFor='title'>Title</label>
                    <input value={title} onChange={handleTitleChange} type='text' id='title' />
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor='description'>Description</label>
                    <textarea value={description} onChange={handleDescriptionChange} id='description' />
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor='status'>Status</label>
                    <select value={statusId} onChange={handleStatusIdChange} id='status'>
                        {statuses.map(status => <option key={status.id} value={status.id}>{status.name}</option>)}
                    </select>
                </div>
                <div className={classes['form-control']}>
                    <button type='submit' className={classes.button}>
                        {props.editing && 'Save Changes'}
                        {!props.editing && 'Create Task'}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default NewTask;