import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/user/User'
import Game from '../components/game/Game'

import * as gameActions from '../actions/GameActions'

class App extends Component {
    render() {
        const { user, game } = this.props;
        const { setSquareActive } = this.props.gameActions;
        return <div>
            <User name={ user.name }/>
            <Game
                squares={ game.squares }
                currentSquares={ game.currentSquares }
                attempts={ game.attempts }
                boardEnable={ game.boardEnable }
                setSquare={ setSquareActive } />
        </div>
    }
}

function mapStateToProps (state) {
    return {
        game: state.game,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        gameActions: bindActionCreators(gameActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);