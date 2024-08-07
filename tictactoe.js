const Marker = Object.freeze({
    empty: '-',
    x: 'X',
    o: 'O'
});

const GameBoard = (() => {
    // Board and dimensions
    const board = [];
    const rows = 3;
    const cols = 3;

    // Create the game board
    const createGameBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = Marker.empty;
            }
        }
    };

    // get the current game board
    const getGameBoard = () => {
        return board;
    };

    // player makes a move
    const placeMarker = (space) => {

    }

    // check if a move is valid (i.e. space is empty)
    const moveIsValid = (space) => {

    }

    // check if a player has won or the game has ended in a draw
    const isGameOver = () => {
        return false;
    };

    return { createGameBoard, getGameBoard, isGameOver };
})();


const Player = (() => {
    const createPlayer = (name, marker) => {
        return { name, marker };
    };

    return { createPlayer };
})();

const GameController = (() => {
    // initialize game state
    const player1 = Player.createPlayer("Player 1", Marker.x);
    const player2 = Player.createPlayer("Player 2", Marker.o);
    const currentPlayer = player1;
    const winner = null;

    const displayGameBoard = (board) => {
        const rows = board.length;
        for (let i = 0; i < rows; i++) {
            console.log(board[i]);
        }
    }

    GameBoard.createGameBoard();
    console.clear;
    // while (!GameBoard.isGameOver()) {
    //     console.clear();
    // }
    displayGameBoard(GameBoard.getGameBoard());
})();