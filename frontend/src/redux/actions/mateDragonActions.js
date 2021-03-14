import { MATE_DRAGON_BEGIN, MATE_DRAGON_FAILURE, MATE_DRAGON_SUCCESS } from '../types/mateDragonTypes';
import { fetchAccountDragons } from './accountDragonActions';

export const mateDragonBegin = () => dispatch => {
    dispatch({ type: MATE_DRAGON_BEGIN });
}

export const mateDragon = ({ matronDragonId, patronDragonId }) => dispatch => {
    // dispatch({ type: MATE_DRAGON_BEGIN });

    return fetch(`/dragon/mate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                matronDragonId,
                patronDragonId
            }
        )
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                dispatch({
                    type: MATE_DRAGON_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: MATE_DRAGON_SUCCESS,
                    payload: data
                })
                // dispatch(fetchAccountDragons);
            }
        }))
        .catch(error => {
            dispatch({
                type: MATE_DRAGON_FAILURE,
                payload: error.message
            })
        })
}