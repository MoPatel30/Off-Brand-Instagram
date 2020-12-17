import React, {useState} from 'react'
import "./Login.css";
import {auth, provider} from "./firebase"
import App from "./App"
import {connect} from "react-redux"
import store from "./store/index"


function Login() {
    const [user, setUser] = useState("")

    function signIn(){
        auth
        .signInWithPopup(provider)
        .then((result) =>{
          console.log(result)
          console.log(result.user.displayName)
          setUser(result.user.displayName)  
          updateState(result.user.displayName)       
        })     
    }


    function updateState(name){
        console.log(name)
        store.dispatch({
            type: "ADD_POST",
            payload: name
          })
    }


    return (
        <div id = "login-pos">
            <div className = "login-screen">
                <h1 id = "welcome"><i>Welcome to PhotoShare</i></h1>
                <h2 id = "title"> Sign In </h2>
                <button id = "google-btn" onClick = {signIn}>Google</button>
            </div>
            
            
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}
export default connect(mapDispatchToProps)(Login)
