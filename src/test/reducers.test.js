import reducer from "../reducers/reducer";
import { ActionCode } from "../actions/constants";


describe("Reducer", () => {
    it("LOADING", ()=> {
        const state = {
            airlineList:[],
            loading: false,
            error:null,
            favorites:[]
        }
        const action = {
            type: ActionCode.LOADING,
            loading: true,
        }

        const results = reducer(state, action);
        expect(results)
            .toEqual({
                airlineList:[],
                loading: true,
                error:null,
                favorites:[]
            })
    })
})

describe("Reducer Error", () => {
    it("ERROR", ()=> {
        const state = {
            airlineList:[],
            loading: false,
            error:null,
            favorites:[]
        }
        const action = {
            type: ActionCode.ERROR,
            error: {
                msg:"Testing Error"
            },
        }

        const results = reducer(state, action);
        expect(results)
            .toEqual({
                airlineList:[],
                loading: false,
                error:{
                    msg:"Testing Error"
                },
                favorites:[]
            })
    })
})