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

    const displayGameBoard = () => {
        const rows = board.length;
        for (let i = 0; i < rows; i++) {
            console.log(board[i]);
        }
    };

    // player makes a move
    const placeMarker = (player, x, y) => {
        if (moveIsValid(x,y)) {
            board[x][y] = player.marker;
        } else {
            console.log("Invalid move");
        }
    };

    // check if a move is valid (i.e. space is empty)
    const moveIsValid = (x, y) => {
        if (board[x][y] === Marker.empty) {
            return true;
        } else {
            return false;
        }
    };

    // check if a player has won or the game has ended in a draw
    const isGameOver = () => {
        return false;
    };

    return { createGameBoard, getGameBoard, displayGameBoard, placeMarker, isGameOver };
})();


const Player = (() => {
    const createPlayer = (name, marker) => {
        return { name, marker };
    };

    return { createPlayer };
})();

const GameController = (() => {
    // initialize game state
    GameBoard.createGameBoard();
    const player1 = Player.createPlayer("Player 1", Marker.x);
    const player2 = Player.createPlayer("Player 2", Marker.o);
    const board = GameBoard.getGameBoard(); // will this work??
    let currentPlayer;
    const winner = null;

    const getCurrentPlayer = () => {
        if (currentPlayer === (null || undefined) || currentPlayer === player2) {
            console.log("Current player is now player 1")
            currentPlayer = player1;
        } else {
            console.log("Current player is now player 2")
            currentPlayer = player2;
        }
    };

    let testCounter = 0;
    while (!GameBoard.isGameOver()) {
        getCurrentPlayer();
        GameBoard.displayGameBoard();
        GameBoard.placeMarker(currentPlayer, testCounter, 1);
        testCounter += 1;
        if (testCounter === 3) {
            return;
        }
    }

})();