import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Board from '../board/Board'

import './game.css';

export default class Game extends Component {

    handleClick (i){
        if (this.props.boardEnable) this.props.setSquare(this.props.squares[i]);
    }

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