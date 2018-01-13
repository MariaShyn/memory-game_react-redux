import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Board from './Board'

export default class Game extends Component {

    handleClick (i){
        if (this.props.boardEnable) this.props.setSquare(this.props.squares[i]);
    }

    /*countUnopened () {
        let count = 0;
        for(let i = 0; i < this.state.squares.length; i++ ) {
            if('opened' in this.state.squares[i]) count++;
        }
        return this.state.squares.length - count;
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
            attempts: this.state.attempts + 1
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
    }*/
    render() {
        const { squares, attempts } = this.props;
        return (
            <div className="game">
                <div className="welcome-message">
                    <h1>Welcome to "Memory" game!!!</h1>
                </div>
                <div className="game-board">
                    <Board squares={squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    {/*<div>Unopened: {this.countUnopened()}</div>*/}
                    <div>Attempts: {attempts}</div>
                </div>
            </div>
        )
    }
}

Game.propTypes = {
    squares: PropTypes.array.isRequired,
    attempts: PropTypes.number.isRequired
};