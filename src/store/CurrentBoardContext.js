import { createContext, useState } from "react";

const CurrentBoardContext = createContext({
    board: {},
    changeBoard: () => { },
    initBoard: () => { }
})

export function CurrentBoardContextProvider(props) {

    const [board, setBoard] = useState({});

    function initBoard() {
        fetch('http://localhost:3000/boards')
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) setBoard(data[0])
            })
    }

    function changeBoard(newBoard) {
        setBoard(newBoard);
    }

    let context = {
        board,
        initBoard,
        changeBoard
    }

    return (
        <CurrentBoardContext.Provider value={context}>
            {props.children}
        </CurrentBoardContext.Provider>
    )
}

export default CurrentBoardContext;