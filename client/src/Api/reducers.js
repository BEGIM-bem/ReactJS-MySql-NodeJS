export const GetDate = 'GetDate'


let defaultState = {
    date: []

}


function userReducer(state = defaultState, action) {

    switch (action.type) {

        case GetDate:
            return {
                ...state,
                date: action.date,
            }

        default:
            return state
    }
}




export default userReducer;