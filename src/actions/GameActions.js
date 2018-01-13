import {
    SET_SQUARE_ACTIVE,
    CHECK_IF_TWO_CURRENT
} from '../constants/Game'

export function setSquareActive (square) {
    return (dispatch) =>  {
        dispatch({
            type: SET_SQUARE_ACTIVE,
            payload: square
        });

        setTimeout(() => {
            dispatch({
                type: CHECK_IF_TWO_CURRENT
            })
        }, 300)
    }
}