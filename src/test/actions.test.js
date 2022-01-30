import { fetchAirlines } from "../actions/actions";
import { store } from "../store/store"
jest.setTimeout(100000)

describe("Action Fetch With Error", () => {
    let testStore = store;
    let url = ""

    beforeAll (async()=>{
        try{
            await testStore.dispatch(fetchAirlines(url))
        } catch(e){}
    })
    
    it('List is Empty', () => {
        expect(testStore.getState().airlineList.length).toBe(0)
    })

    it('Loading is False', () => {
        expect(testStore.getState().loading).toBe(false)
    })

    it('Error is Defined', () => {  
        expect(testStore.getState().error).toBeDefined()
    })
})

describe("Action Fetch with Success", () => {
    let testStore = store;
    let url = "https://api.instantwebtools.net/v1/airlines"

    beforeAll (async()=>{
        await testStore.dispatch(fetchAirlines(url))
    })

    console.log(testStore.getState())
    
    it('List is not Empty', () => {
        expect(testStore.getState().airlineList.length).toBeGreaterThan(0)
    })

    it('Loading is False', () => {
        expect(testStore.getState().loading).toBe(false)
    })

    it('Error is Null', () => {  
        expect(testStore.getState().error).toBe(null)
    })
})
