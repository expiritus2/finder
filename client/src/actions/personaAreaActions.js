import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchObjects = () => async dispatch => {
    const objects = await axios.get('/api/personal-area');
    dispatch({type: actionTypes.FETCH_OBJECTS, objects: objects.data});
};