
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
        // case "SET_FAVORITS":
        //     let airlineList = state.airlineList;
        //     let item = airlineList.find((item)=> item.id === action.id)

        //     // if(airlineList[action.id]){
        //     //     airlineList[action.id].favorite = !airlineList[action.id].favorite;
        //     // }
        //     // console.log(airlineList)
            
        //     return {...state, airlineList:airlineList, loading:action.loading}
        default:
            return state;

    }
}

export default reducer;