const Marker = Object.freeze({
    empty: '-',
    x: 'X',
    o: 'O'
});


const GameStatus = Object.freeze({
    playing: "Playing",
    invalidMove: "Invalid move",
    win: "Win",
    draw: "Draw"
})


const Player = ((playerName, playerMarker) => {
    let name = playerName;
    let marker = playerMarker;

    const getName = () => name;
    const getMarker = () => marker;

    return { 
        getName, 
        getMarker 
    };
});


const BoardSpace = (() => {
    let marker = Marker.empty;

    const setMarker = (playerMarker) => {
        marker = playerMarker;
    }

    const getMarker = () => marker;

    return { 
        setMarker, 
        getMarker 
    };
});


const Board = (() => {
    const board = [];
    const rows = 3;
    const cols = 3;

    const createGameBoard = (() => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = BoardSpace();
            }
        }
    })();

    const getGameBoard = () => board;

    return {
        getGameBoard
    }
});

const GameController = (() => {
    const players = [ 
        Player("Player One", Marker.x), 
        Player("Player Two", Marker.o) 
    ];
    const board = Board();
    const gameState = board.getGameBoard();
    let activePlayer = players[0];
    let gameStatus = GameStatus.playing;

    const getGameState = () => gameState;

    const getGameStatus = () => gameStatus;

    const updateActivePlayer = () => {
        activePlayer = (players[(players.indexOf(activePlayer) + 1) % 2]);
    };

    const setPlayerMarker = (space) => {
        if (gameStatus === GameStatus.draw || gameStatus === GameStatus.win) {
            return;
        }
        gameStatus = GameStatus.playing;
        if (!moveIsValid(space)) {
            gameStatus = GameStatus.invalidMove;
            return;
        }
        const marker = activePlayer.getMarker();
        space.setMarker(marker);
        if (gameIsDraw()) {
            gameStatus = GameStatus.draw;
            return;
        }
        if (moveWinsGame(space)) {
            gameStatus = GameStatus.win;
            return;
        }
        updateActivePlayer();
    };

    const moveIsValid = (space) => {
        if (space.getMarker() === Marker.empty) {
            return true;
        }
        return false;
    };

    const gameIsDraw = () => {
        let counter = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const test = gameState[i][j];
                if (gameState[i][j].getMarker() !== Marker.empty) {
                    counter++;
                }
            }
        }
        return (counter === 9);
    };

    const getActivePlayer = () => activePlayer;

    const moveWinsGame = (space) => {
        const marker = space.getMarker();
        let [rowCount, colCount, diagCount] = [0,0,0];
        let x, y;

        for (let m = 0; m < 3; m++) {
            for (let n = 0; n < 3; n++) {
                if (gameState[m][n] === space) {
                    x = m;
                    y = n;
                }
            }
        };

        for (let i = 0; i < 3; i++) {
            if (gameState[x][i].getMarker() === marker) {
                ++rowCount;
            }
            if (gameState[i][y].getMarker() === marker) {
                ++colCount;
            }
            if (rowCount === 3 || colCount === 3) {
                return true;
            }
        }

        if (((x + y) % 2) === 0) {
            if (x + y === 2) {
                for (let j = 0; j < 3; j++) {
                    if (gameState[2-j][0 + j].getMarker() === marker) {
                        ++diagCount;
                    }
                    if (diagCount === 3) {
                        return true;
                    }
                }
            } else {
                for (let k = 0; k < 3; k++) {
                    if (gameState[k][k].getMarker() === marker) {
                        ++diagCount;
                    }
                    if (diagCount === 3) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    return { 
        getGameState,
        getGameStatus,
        setPlayerMarker,
        getActivePlayer
    };
});

const DisplayController = (() => {
    const game = GameController();

    const createGameElements = () => {
        const gameState = game.getGameState();
        const gameBoardContainer = document.getElementsByClassName("game-board-container")[0];

        document.getElementsByClassName("game-text-display")[0].innerHTML = `${game.getActivePlayer().getName()}'s turn`;

        const board = document.createElement("div");
        board.classList.add("board");

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div");

                if (i % 2 === 0) {
                    i === 0 ? cell.classList.add("cell-upper") : cell.classList.add("cell-lower");
                }
                if (j % 2 === 0) {
                    j === 0 ? cell.classList.add("cell-left") : cell.classList.add("cell-right");
                }
                
                cell.classList.add("cell");
                cell.innerHTML = gameState[i][j].getMarker();
                cell.addEventListener("click", () => {
                    game.setPlayerMarker(game.getGameState()[i][j]);
                    cell.innerHTML = game.getGameState()[i][j].getMarker();
                    switch (game.getGameStatus()) {
                        case GameStatus.playing:
                            document.getElementsByClassName("game-text-display")[0].innerHTML = `${game.getActivePlayer().getName()}'s turn`;
                            break;
                        case GameStatus.invalidMove:
                            window.alert("Invalid move.");
                            break;
                        case GameStatus.draw:
                            document.getElementsByClassName("game-text-display")[0].innerHTML = `${game.getGameStatus()}`;
                            break;
                        case GameStatus.win:
                            document.getElementsByClassName("game-text-display")[0].innerHTML = `Winner: ${game.getActivePlayer().getName()}`
                    }
                });
                board.appendChild(cell);
            }
        }
        gameBoardContainer.appendChild(board);
    }

    document.addEventListener("DOMContentLoaded", () => {
        createGameElements();
    });
})();