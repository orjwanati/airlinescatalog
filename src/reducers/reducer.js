import { ActionCode } from "../actions/constants"

const initialState = {
    airlineList:[],
    loading: false,
    error:null,
    favorites:[]
}

const reducer = (state = initialState, action ) => {
    // console.log("Received an action to Reducer", action)
    switch(action.type) {
        case ActionCode.FETCH:
            return {...state, airlineList: action.airlineList, error:null, loading:action.loading}
        case ActionCode.ERROR:
            return {...state, error:action.error, airlineList:[], loading:false}
        case ActionCode.LOADING:
            return {...state, error:null, loading:action.loading}
        case ActionCode.SET_FAVORITES:
            return {...state, error:null, favorites:[...state.favorites, action.id]}
        default:
            return state;
    }
}

export default reducer;