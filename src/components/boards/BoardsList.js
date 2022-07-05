import { useContext, useEffect, useState } from "react";
import CurrentBoardContext from "../../store/CurrentBoardContext";
import classes from './Board.module.css';
import NewBoard from "./NewBoard";

function BoardsList() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);

    const currentBoardCtx = useContext(CurrentBoardContext);

    useEffect(() => {
        fetchList()
    }, [currentBoardCtx.board]);

    function fetchList() {
        setLoading(true);
        fetch('http://localhost:3000/boards')
            .then(res => res.json())
            .then(data => {
                if (Object.keys(currentBoardCtx.board).length === 0 && data.length > 0) currentBoardCtx.changeBoard(data[0])
                setBoards(data)
            })
            .finally(() => setLoading(false));
    }

    function changeCurrent(board) {
        currentBoardCtx.changeBoard(board);
    }

    if (loading) {
        return <p>loading...</p>
    }

    return (
        <div className={classes.list}>
            <h3>ALL BOARDS ({boards.length})</h3>
            <ul>
                {boards.map(board =>
                    <li onClick={() => changeCurrent(board)} className={`${classes.item} ${currentBoardCtx.board.id === board.id ? classes.current : ''} `} key={board.id}>
                        <span className="material-icons">
                            space_dashboard
                        </span>
                        <span>{board.title}</span>
                    </li>)}
                <NewBoard updateList={fetchList} />
            </ul>
        </div >
    )
}

export default BoardsList;