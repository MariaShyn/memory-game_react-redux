import { SET_SQUARE_ACTIVE, CHECK_IF_TWO_CURRENT } from '../constants/Game'


const initialState = {
    squares: fillSquares(),
    currentSquares: [],
    attempts: 0,
    boardEnable: true
};

function fillSquares()  {
    let squares = [];
    let newIds = [];
    while (squares.length < 16) {
        let nextId = getRandomInt(1, 16);
        if (~newIds.indexOf(nextId)) continue;

        newIds.push(nextId);
        let nextValue = { "id": nextId };
        squares.push(nextValue,  Object.assign({}, nextValue));
    }

    shuffle(squares);
    return squares;
}


function shuffle (a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function setSquareActive (state, action) {
    if (action.payload.active || action.payload.opened) return {};

    let newSquares = state.squares.slice(),
        newCurrentSquares = state.currentSquares.slice(),
        indexOfSquare = state.squares.indexOf(action.payload);

    newSquares[indexOfSquare].active = "true";

    newCurrentSquares.push(newSquares[indexOfSquare]);

    return { squares: newSquares, currentSquares: newCurrentSquares, boardEnable: false, attempts: state.attempts + 1 };
}

function checkCurrentSquares (state) {
    if (state.currentSquares.length !== 2) return { boardEnable: true };

    let newSquares = state.squares.slice(),
        newCurrentSquares = state.currentSquares.slice();

    if (newCurrentSquares[0].id !== newCurrentSquares[1].id) {
        newSquares[newSquares.indexOf(newCurrentSquares[0])].active = false;
        newSquares[newSquares.indexOf(newCurrentSquares[1])].active = false;
    } else {
        newSquares[newSquares.indexOf(newCurrentSquares[0])].opened = true;
        newSquares[newSquares.indexOf(newCurrentSquares[1])].opened = true;
    }

    newCurrentSquares = [];

    return { squares: newSquares, currentSquares: newCurrentSquares, boardEnable: true }

}

export default function game (state = initialState, action) {
    switch (action.type) {
        case SET_SQUARE_ACTIVE:
            return Object.assign({}, state, setSquareActive(state, action));
        case CHECK_IF_TWO_CURRENT:
            return Object.assign({}, state, checkCurrentSquares(state));
        default:
            return state;
    }
}

