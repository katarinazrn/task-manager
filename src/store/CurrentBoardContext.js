import { createContext, useState } from "react";

const CurrentBoardContext = createContext({
    board: {},
    changeBoard: () => { },
    initBoard: () => { },
    totalBoards: 0,
    setTotal: () => { }
})

export function CurrentBoardContextProvider(props) {

    const [board, setBoard] = useState({});
    const [totalBoards, setTotalBoards] = useState(0);

    function initBoard() {
        fetch(`${process.env.REACT_APP_DB_URL}/boards`)
            .then(res => res.json())
            .then(data => {
                setTotalBoards(data.length);
                if (data.length > 0) setBoard(data[0])
            })
    }

    function setTotal(total) {
        setTotalBoards(total)
    }

    function changeBoard(newBoard) {
        setBoard(newBoard);
    }

    let context = {
        board,
        initBoard,
        changeBoard,
        totalBoards,
        setTotal
    }

    return (
        <CurrentBoardContext.Provider value={context}>
            {props.children}
        </CurrentBoardContext.Provider>
    )
}

export default CurrentBoardContext;