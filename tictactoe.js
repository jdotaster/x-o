const boardSpace = Object.freeze({
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
    const createGameBoard = (() => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = boardSpace.empty;
            }
        }
    })();

    // Get the current game board
    const getGameBoard = (() => {
        for (let i = 0; i < rows; i++) {
            console.log(board[i]);
        }
    });

    return { getGameBoard };
})();

gameBoard.getGameBoard();