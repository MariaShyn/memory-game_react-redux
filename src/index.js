import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const classNames = require('classnames');


class Square extends React.Component {
    render () {
        let self = this;

        const squareClasses = classNames({
            'square': true,
            'square_active': self.props.value.active,
            'square_opened': self.props.value.opened
        });

        return (
            <button className={squareClasses} onClick={this.props.onClick}>
                <img src={process.env.PUBLIC_URL + '/images/' + this.props.value.id + '.png'} alt={this.props.value.id}/>
            </button>
        )
    }
}

class Board extends React.Component {
    renderSquare (i) {
        return (
            <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)} />
        );
    }

    render () {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                </div>
                <div className="board-row">
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            squares: fillSquares(),
            currentSquares: [],
            attempts: 0
        }
    }

    handleClick (i) {
       this.handleClickFunction(i);
    }

    countUnopened () {
        let count = 0;
        for(let i = 0; i < this.state.squares.length; i++ ) {
            if('opened' in this.state.squares[i]) count++;
        }
        return this.state.squares.length -  count;
    }

    handleClickFunction (i) {
        if (this.state.squares[i].active || this.state.squares[i].opened) return;

        let squares = this.state.squares.slice(),
            currentSquares = this.state.currentSquares.slice();

        squares[i].active = "true";

        currentSquares.push(squares[i]);


        this.setState({
            squares: squares,
            currentSquares: currentSquares,
            attempts: ++this.state.attempts
        });
    }

    componentDidUpdate (prevProps, prevState) {
        let squares = this.state.squares.slice(),
            currentSquares = this.state.currentSquares.slice();
        this.handleClick = function (i) {
            this.handleClickFunction(i);
        };

        if (currentSquares.length === 2) {
            this.handleClick = () => {
                return false;
            };

            if (currentSquares[0].id !== currentSquares[1].id) {
                squares[squares.indexOf(currentSquares[0])].active = false;
                squares[squares.indexOf(currentSquares[1])].active = false;
            } else {
                squares[squares.indexOf(currentSquares[0])].opened = true;
                squares[squares.indexOf(currentSquares[1])].opened = true;
            }

            currentSquares = [];

            setTimeout(() => {
                this.setState({
                    squares: squares,
                    currentSquares: currentSquares
                });
            }, 400);

        }
    }


    render() {
        return (
            <div className="game">
                <div className="welcome-message">
                    <h1>Welcome to "Memory" game!!!</h1>
                </div>
                <div className="game-board">
                    <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>Unopened: {this.countUnopened()}</div>
                    <div>Attempts: {this.state.attempts}</div>
                </div>
            </div>
        )
    }
}

/**
 * Fill square arrays
 * @returns {Array}
 */

function fillSquares () {
    let squares = [];
    let newIds = [];
    while (squares.length < 16) {
        let nextId = getRandomInt(1, 16);
        if (~newIds.indexOf(nextId)) continue;

        newIds.push(nextId);
        let nextValue1 = { "id": nextId };
        let nextValue2 = { "id": nextId };
        squares.push(nextValue1, nextValue2);
    }

    shuffle(squares);
    return squares;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);