import React, { Component } from 'react';
const classNames = require('classnames');

import './square.css';

export default class Square extends Component {
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