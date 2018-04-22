import axios from 'axios';
import * as actionTypes from './actionTypes';


export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({type: actionTypes.FETCH_USER, user: res.data});
};

export const getId = () => {
    return new Date() * Math.random() * Math.random();
};