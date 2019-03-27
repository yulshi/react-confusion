import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errmsg: null,
    comments: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(action.payload)
            };
        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                errmsg: null,
                comments: action.payload
            };
        case ActionTypes.COMMENTS_FAILED:
            return {
                ...state,
                errmsg: action.payload
            };
        default:
            return state;
    }
}