import { UPDATE_DRAGON_BEGIN, UPDATE_DRAGON_FAILURE, UPDATE_DRAGON_SUCCESS } from '../types/updateDragonTypes';
import { fetchAccountDragons } from './accountDragonActions';

export const updateDragon = ({ dragonId, nickname, isPublic, saleValue, sireValue }) => dispatch => {
    dispatch({ type: UPDATE_DRAGON_BEGIN });

    return fetch(`/dragon/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                dragonId,
                nickname,
                isPublic,
                saleValue,
                sireValue,
            }
        )
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                dispatch({
                    type: UPDATE_DRAGON_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: UPDATE_DRAGON_SUCCESS,
                    payload: data.info
                })
                dispatch(fetchAccountDragons);
            }
        }))
        .catch(error => {
            dispatch({
                type: UPDATE_DRAGON_FAILURE,
                payload: error.message
            })
        })
}