import { ActionCode } from "./constants"

export const fetchAirlines = (url) => {
    return (dispatch) => {
        dispatch({type: ActionCode.LOADING, loading: true})
        return fetch(url)
               .then(response => response.json())
               .then(json => dispatch(
                   {type: ActionCode.FETCH, airlineList: json, loading:false}
               ))
               .catch(err => dispatch(
                    {type: ActionCode.ERROR, error:{msg: "Unable to fetch data"}}
               ) ) 
    }
}


export const setFavorite = (id) => {
    return (dispatch) => {
        dispatch({type: ActionCode.SET_FAVORITES, id: id})
    }
}