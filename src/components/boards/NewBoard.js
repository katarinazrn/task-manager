import React, { useContext, useRef, useState } from 'react';
import CurrentBoardContext from '../../store/CurrentBoardContext';
import InputField from '../ui/input/InputField';
import classes from './Board.module.css';

function NewBoard(props) {

    const [showInput, setShowInput] = useState(false);
    const titleRef = useRef();
    const currentBoardCtx = useContext(CurrentBoardContext);

    function showInputField() {
        setShowInput(true);
    }

    function hideInputField() {
        setShowInput(false);
    }

    function addBoard() {

        const title = titleRef.current.value;
        if (title.trim() === '') return;

        fetch(`${process.env.REACT_APP_DB_URL}/boards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        })
            .then(res => res.json())
            .then((data) => {
                props.updateList();
                currentBoardCtx.changeBoard(data);
                setShowInput(false)
                currentBoardCtx.setTotal(currentBoardCtx.totalBoards + 1);
            })
    }

    return (
        <InputField showInput={showInput} hideInput={hideInputField}>
            <li className={`${classes.item} ${showInput ? classes.input : classes.button}`} onClick={showInputField}>
                {!showInput &&
                    <React.Fragment>
                        <span className="material-icons">
                            space_dashboard
                        </span>
                        <span>+Create New Board</span>
                    </React.Fragment>}
                {showInput &&
                    <React.Fragment>
                        <input autoFocus name='title' ref={titleRef} type='text' placeholder='Board Name' />
                        <span onClick={addBoard} className={`${classes.plus} material-icons`}>
                            add
                        </span>
                    </React.Fragment>
                }
            </li>
        </InputField>)
}

export default NewBoard;