import {createStore} from "redux"


const initialState = {
    username: "",
    userPhoto: "",
    userID: "", 
    liked: 0,
    posts: 0,
    bio: ""
}

const reducer = (state = initialState, action) => {
    if(action.type === "ADD_POST"){
        return Object.assign({}, state, {
            username : action.payload.username,
            userPhoto: action.payload.userphoto,
            userID: action.payload.userID,
            liked: action.payload.liked,
            posts: action.payload.posts,
            bio: action.payload.bio
        })

    }

    return state
}



const store = createStore(reducer)

export default store