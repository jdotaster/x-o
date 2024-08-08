const Marker = Object.freeze({
    empty: '-',
    x: 'X',
    o: 'O'
});

const BoardSpace = (() => {
    let marker = Marker.empty;

    const setMarker = (player) => {
        value = player.marker;
    }

    const getMarker = () => marker;

    return { 
        setMarker, 
        getMarker 
    };
});


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

    const getGameState = (() => {
        return gameState.map((row) => row.map((boardSpace) => boardSpace.getMarker()))
    });

    const updateActivePlayer = () => {
        activePlayer = ((players.indexOf(activePlayer) + 1) % 2);
    };

    const placePlayerMarker = (player, space) => {
        space.setMarker(player.getMarker());
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
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (board[i][j].getMarker() !== Marker.empty) {
                    counter++;
                }
            }
        }
        return (counter === 9);
    };

    const getActivePlayer = () => { activePlayer };

    const moveWinsGame = (x, y) => {
        let marker = board[x][y].getMarker();
        let [rowCount, colCount, diagCount] = [0,0,0];

        for (let i = 0; i < 3; i++) {
            if (board[x][i].getMarker() === marker) {
                ++rowCount;
            }
            if (board[i][y].getMarker() === marker) {
                ++colCount;
            }
            if (rowCount === 3 || colCount === 3) {
                return true;
            }
        }

        if (((x + y) % 2) === 0) {
            if (x + y === 2) {
                for (let j = 0; j < 3; j++) {
                    if (board[2-j][0 + j].getMarker() === marker) {
                        ++diagCount;
                    }
                    if (diagCount === 3) {
                        return true;
                    }
                }
            } else {
                for (let k = 0; k < 3; k++) {
                    if (board[k][k].getMarker() === marker) {
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
        getActivePlayer
    };
});

const ConsoleDisplayController = (() => {
    const game = GameController();
    console.log(game.getGameState());
})();