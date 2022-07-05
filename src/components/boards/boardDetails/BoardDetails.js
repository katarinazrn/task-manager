import { useContext, useEffect, useState } from "react";
import CurrentBoardContext from "../../../store/CurrentBoardContext";
import TasksContext from "../../../store/TasksContext";
import Modal from "../../ui/modal/Modal";
import classes from './BoardDetails.module.css';

function BoardDetails(props) {

    const [title, setTitle] = useState('');
    const [showSaveButton, setShowSaveButton] = useState(false);
    const currentBoardCtx = useContext(CurrentBoardContext);
    const tasksCtx = useContext(TasksContext);

    useEffect(() => {
        setTitle(currentBoardCtx.board.title);
    }, [currentBoardCtx.board])

    function showInput() {
        setShowSaveButton(true);
    }

    function hideInput() {
        setShowSaveButton(false);
    }

    function handleChange(e) {
        let newTitle = e.target.value.trim();
        setTitle(newTitle);
    }

    async function changeTitle() {
        let res = await fetch(`http://localhost:3000/boards/${currentBoardCtx.board.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: currentBoardCtx.board.id,
                title: title
            })
        })
        let data = await res.json();

        currentBoardCtx.changeBoard(data);
        props.hide();
    }

    async function deleteBoard() {
        const boardId = currentBoardCtx.board.id;
        const tasks = tasksCtx.tasks;

        tasks.forEach(task => tasksCtx.removeTask(task.id));

        let res = await fetch(`http://localhost:3000/boards/${boardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        currentBoardCtx.initBoard();
        props.hide();
    }

    return (
        <Modal cancel={props.hide}>
            <div className={classes.content}>
                <h3>Board</h3>
                {showSaveButton && <div className={classes.input}>
                    <input autoFocus className={classes.title} value={title} onChange={handleChange} type='text' />
                    <button onClick={changeTitle} className={`${classes.save} material-icons`}>save</button>
                </div>}
                {
                    !showSaveButton &&
                    <div className={classes.titleContainer}>
                        <p className={classes.title}>{title}</p>
                        <span onClick={showInput} className="material-icons">edit</span>
                    </div>
                }
                <button onClick={deleteBoard} className={classes.delete}>Delete This Board</button>
            </div>
        </Modal>
    )
}

export default BoardDetails;