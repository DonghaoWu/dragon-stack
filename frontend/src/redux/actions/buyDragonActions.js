import { BUY_DRAGON_BEGIN, BUY_DRAGON_FAILURE, BUY_DRAGON_SUCCESS } from '../types/buyDragonTypes';

export const clearBuyState = () => dispatch => {
    dispatch({ type: BUY_DRAGON_BEGIN });
}

export const buyDragon = ({ dragonId, saleValue }) => dispatch => {
    dispatch({ type: BUY_DRAGON_BEGIN });

    return fetch(`/dragon/buy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                dragonId,
                saleValue
            }
        )
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                dispatch({
                    type: BUY_DRAGON_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: BUY_DRAGON_SUCCESS,
                    payload: data.info
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: BUY_DRAGON_FAILURE,
                payload: error.message
            })
        })
}