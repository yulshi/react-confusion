import * as ActionTypes from './ActionTypes';

export const Leaders = (state = {
    isLoading: true,
    errmsg: null,
    leaders: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_LEADS:
            return {
                ...state,
                isLoading: false,
                errmsg: null,
                leaders: action.payload
            };
        case ActionTypes.LEADS_LOADING:
            return {
                ...state,
                isLoading: true,
                errmsg: null,
                leaders: []
            };
        case ActionTypes.LEADS_FAILED:
            return {
                ...state,
                isLoading: false,
                errmsg: action.payload
            };
        default:
            return state;
    }
}
