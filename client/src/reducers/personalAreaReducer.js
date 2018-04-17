import * as actionTypes from '../actions/actionTypes';

export default (state = null, action) => {
    console.log(action);
    switch (action.type){
        case actionTypes.FETCH_OBJECTS:
            return action.objects || {};
        default:
            return state;
    }
}