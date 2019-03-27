import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    let newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
    };
    newComment.date = new Date().toISOString();

    alert(JSON.stringify(newComment));

    return fetch(baseUrl + 'comments',
        {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(
            resp => {
                if (resp.ok) {
                    return resp;
                } else {
                    let error = new Error('Error ' + resp.status);
                    error.response = resp;
                    throw error;
                }
            },
            error => { throw error }
        )
        .then(resp => resp.json())
        .then(comment => dispatch(addComment(comment)))
        .catch(error => {
            console.log('post comments', error.message);
            alert('Your comment could not be posted\n', 'Error: ', error.message);
        });
}

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading());

    fetch(baseUrl + 'dishes')
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            err => {
                throw new Error(err.message);
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmsg
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// For Promotions:
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmsg
})

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + "promotions")
        .then(
            resp => {
                if (resp.ok) {
                    return resp;
                } else {
                    let error = new Error('Error: ' + resp.status + ': ' + resp.statusText);
                    error.response = resp;
                    throw error;
                }
            },
            error => {
                throw new Error(error.message);
            }
        )
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));

}

// For Leaders:
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADS,
    payload: leaders
});

export const leadersLoading = () => ({
    type: ActionTypes.LEADS_LOADING,
});

export const leadersFailed = (errmsg) => ({
    type: ActionTypes.LEADS_FAILED,
    payload: errmsg
});

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(
            resp => {
                if (resp.ok) {
                    return resp;
                } else {
                    let error = new Error('Error: ' + resp.status + ': ' + resp.statusText);
                    error.response = resp;
                    throw error;
                }
            },
            error => {
                throw new Error(error.message);
            }
        )
        .then(resp => resp.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));

}

// For Comments:
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errmsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmsg
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(
            resp => {
                if (resp.ok) {
                    return resp;
                } else {
                    let error = new Error('Error: ' + resp.status + ': ' + resp.statusText);
                    error.response = resp;
                    throw error;
                }
            },
            error => {
                throw new Error(error.message);
            }
        )
        .then(resp => resp.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error)));
}
