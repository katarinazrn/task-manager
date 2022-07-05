import { useContext, useEffect, useRef, useState } from 'react';
import CurrentBoardContext from '../../../store/CurrentBoardContext';
import TaskList from '../../tasks/taskList/TaskList';
import InputField from '../../ui/input/InputField';
import classes from './Columns.module.css';

const COLORS = ['#0c92aa', '#560eff', '#11dbff', '#0b4769', '#7cb0ff', '#7824d8']

function Columns(props) {

    const [statuses, setStatuses] = useState([]);
    const [showInput, setShowIntput] = useState(false);
    const newColumnRef = useRef();

    useEffect(() => {
        getStatuses();
    }, []);

    function getStatuses() {
        fetch(`${process.env.REACT_APP_DB_URL}/statuses`)
            .then(res => res.json())
            .then(data => setStatuses(data));
    }

    function showInputField() {
        setShowIntput(true);
    }

    function hideInputField() {
        setShowIntput(false);
    }

    async function addColumn() {
        let name = newColumnRef.current.value;

        if (name.trim() === '') return;

        let res = await fetch(`${process.env.REACT_APP_DB_URL}/statuses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        })
        let data = await res.json();

        setShowIntput(false);
        getStatuses();
    }

    return (
        <div className={classes.columns}>
            {statuses.map((status, i) => {
                return <div key={status.id} className={classes.column}>
                    <div className={classes.status} style={{ width: `calc( 80vw / ${statuses.length + 1} )` }}>
                        <span style={{ backgroundColor: COLORS[i] ? COLORS[i] : COLORS[COLORS.length % i] }} className={classes.circle}></span>
                        <h4>{status.name.toUpperCase()}</h4>
                    </div>
                    <TaskList key={status.id} status={status} />
                </div>
            })}
            <div className={classes.column}>
                <InputField hideInput={hideInputField} showInput={showInput}>
                    {showInput &&
                        <div className={classes.input}>
                            <input placeholder='New Column Name' type='text' ref={newColumnRef} />
                            <span onClick={addColumn} className="material-icons">
                                add
                            </span>
                        </div>}
                    {!showInput &&
                        <div className={classes.newColumn} onClick={showInputField}>
                            <button>+ New Column</button>
                        </div>}
                </InputField>
            </div>
        </div>
    )
}

export default Columns;