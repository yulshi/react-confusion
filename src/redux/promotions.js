import * as ActionTypes from './ActionTypes'

export const Promotions = (state = {
    isLoading: true,
    errmsg: null,
    promotions: []
}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_PROMOS:
            return {
                ...state,
                isLoading: false,
                errmsg: null,
                promotions: action.payload
            };
        case ActionTypes.PROMOS_LOADING:
            return {
                ...state,
                isLoading: true,
                errmsg: null,
                promotions: []
            };
        case ActionTypes.PROMOS_FAILED:
            return {
                ...state,
                isLoading: false,
                errmsg: action.payload
            };
        default:
            return state;
    }
}

