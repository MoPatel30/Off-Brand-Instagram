import {createStore} from "redux"


const initialState = {
    username: "",
    userPhoto: "",
    userID: ""
}

const reducer = (state = initialState, action) => {
    if(action.type === "ADD_POST"){
        return Object.assign({}, state, {
            username : action.payload.username,
            userPhoto: action.payload.userphoto,
            userID: action.payload.userID
        })
    }

    return state
}



const store = createStore(reducer)

export default store