import data from "./test/data"

export const fetchAirlines = () => {
    return (dispatch) => {
        dispatch({type: "LOADING", loading: true})
        return fetch('https://api.instantwebtools.net/v1/airlines')
               .then(response => response.json())
               .then(json => dispatch(
                   {type: "FETCH", airlineList: json, loading:false}
               ))
               .catch(err => dispatch(
                    {type: "ERROR", msg: "Unable to fetch data"}
               ) ) 
    }
}


export const setFavorite = (id) => {
    return (dispatch) => {
        dispatch({type: "SET_FAVORITS", id: id})
    }
}