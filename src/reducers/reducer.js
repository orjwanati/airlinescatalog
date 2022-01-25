
const initialState = {airlineList:[],
loading: false,
error:""}

const reducer = (state = initialState, action ) => {
    console.log("Received an action to Reducer", action)
    switch(action.type) {
        case "FETCH":
            return {...state, airlineList: action.airlineList, loading:action.loading}
        case "ERROR":
            return {...state, error:action.error}
        case "LOADING":
            return {...state, loading:action.loading}
        case "SET_FAVORITS":
            return {...state, favorites:[...state.favorites, action.id]}
        default:
            return state;
    }
}

export default reducer;