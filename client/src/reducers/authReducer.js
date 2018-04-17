import * as actionTypes from "../actions/actionTypes";

export default (state = null, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.FETCH_USER:
            return action.user || false;
        default:
            return state;
    }
}