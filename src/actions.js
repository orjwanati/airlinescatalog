import data from "./test/data"

export const fetchAirlines = () => {
    return (dispatch) => {
        // return dispatch({type: "FETCH", airlineList: (data), loading:false})
        dispatch({type: "LOADING", loading: true})
        return fetch('https://api.instantwebtools.net/v1/airlines')
               .then(response => response.json())
               .then(json => dispatch(
                   {type: "FETCH", airlineList: json, loading:false}
               ))
               .catch(err => dispatch(
                    // or return error
                    {type: "ERROR", msg: "Unable to fetch data"}
                    // {type: "FETCH", airlineList: []}
               ) ) 
    }
}



function reformarAirlinesToDictionary(airlineList) {
    // let newAirlineList = {}
    // airlineList.map((item)=> (newAirlineList[item.id], item))
    const dict = airlineList.reduce((result, curr, index, array) => ({ ...result, [curr.id]: curr }), {});
    // console.log(dict)
    // console.log(newAirlineList)
    return dict;
}

// export const setFavorite = (id) => {
//     return (dispatch) => {
//         dispatch({type: "SET_FAVORITS", id: id})
//     //     return fetch('https://api.instantwebtools.net/v1/airlines')
//     //            .then(response => response.json())
//     //            .then(json => dispatch(
//     //                {type: "FETCH", airlineList: reformarAirlinesToDictionary(json), loading:false}
//     //            ))
//     //            .catch(err => dispatch(
//     //                 // or return error
//     //                 {type: "ERROR", msg: "Unable to fetch data"}
//     //                 // {type: "FETCH", airlineList: []}
//             //    ) ) 
//     }
// }