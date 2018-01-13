import React, { Component } from 'react';

import Square from '../square/Square'

import './board.css';

export default class Board extends Component {
    renderSquare (i) {
        return (
            <Square value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                    key={i}/>
        );
    }

    fillRender () {
        let rows = [];
        let count = 0;
        for (let i = 0;i < Math.sqrt(this.props.squares.length); i++) {
            let rowItems = [];
            for (let i = 0; i < Math.sqrt(this.props.squares.length); i++) {
                rowItems.push(this.renderSquare(count++));
            }
            rows.push(<div className="board-row" key={i}>
                {rowItems}
            </div>);
        }
        return rows;
    }


    render () {
        return (
            <div>
                {this.fillRender()}
            </div>
        )
    }
}