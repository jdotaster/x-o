const Marker = Object.freeze({
    empty: '-',
    x: 'x',
    o: 'o'
});

const gameBoard = (() => {
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

    // Get the current game board
    const getGameBoard = () => {
        for (let i = 0; i < rows; i++) {
            console.log(board[i]);
        }
    };

    return { createGameBoard, getGameBoard };
})();


const Player = (() => {
    const createPlayer = (name, marker) => {
        return { name, marker };
    };

    return { createPlayer };
})();

const player1 = Player.createPlayer("Player 1", Marker.x);
const player2 = Player.createPlayer("Player 2", Marker.o);
gameBoard.createGameBoard();
gameBoard.getGameBoard();