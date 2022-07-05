import { useContext, useState } from "react";
import CurrentBoardContext from "../../../store/CurrentBoardContext";
import BoardDetails from "../../boards/boardDetails/BoardDetails";
import NewTask from "../../tasks/newTask/NewTask";
import classes from './Header.module.css';

function Header(props) {
    const currentBoardCtx = useContext(CurrentBoardContext);
    const [showModal, setShowModal] = useState(false);
    const [showBoardDetails, setShowBoardDetails] = useState(false);

    function showNewTaskForm() {
        setShowModal(true);
    }

    function hideNewTaskForm() {
        setShowModal(false);
    }

    function showBoardOptions() {
        setShowBoardDetails(true);
    }

    function hideBoardOptions() {
        setShowBoardDetails(false);
    }

    return (
        <header className={classes.header}>
            <h3>{currentBoardCtx.board.title}</h3>
            <button onClick={showNewTaskForm}>+ Add New Task</button>
            <span onClick={showBoardOptions} className={`material-icons ${classes.more}`}>more_vert</span>
            {showModal && <NewTask getAllTasks={props.getAllTasks} hide={hideNewTaskForm} />}
            {showBoardDetails && <BoardDetails hide={hideBoardOptions} />}
        </header>
    )
}

export default Header;