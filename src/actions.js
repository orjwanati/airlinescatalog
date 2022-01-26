import { ActionCode } from "./reducers/constants"

export const fetchAirlines = () => {
    return (dispatch) => {
        dispatch({type: ActionCode.LOADING, loading: true})
        return fetch('https://api.instantwebtools.net/v1/airlines')
               .then(response => response.json())
               .then(json => dispatch(
                   {type: ActionCode.FETCH, airlineList: json, loading:false}
               ))
               .catch(err => dispatch(
                    {type: ActionCode.ERROR, msg: "Unable to fetch data"}
               ) ) 
    }
}


export const setFavorite = (id) => {
    return (dispatch) => {
        dispatch({type: ActionCode.SET_FAVORITES, id: id})
    }
}