import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    fetch(baseUrl + 'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)));
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
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)));

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
            .then(resp => resp.json())
            .then(leaders => dispatch(addLeaders(leaders)));

}