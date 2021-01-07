import React, {useState, useEffect} from 'react'
import "./Login.css";
import {auth, provider} from "../firebase"
import {connect} from "react-redux"
import store from "../store/index"
import db from "../firebase"



function Login() {

    const [userInfo, setUserInfo] = useState(null)
    const [isNewProfile, setIsNewProfile] = useState(null)
    const [checkProfiles, setCheckProfiles] = useState(null)

    function signIn(){
        auth
            .signInWithPopup(provider)
            .then((result) => {
              
                console.log(result.user)
                setUserInfo(result.user)
                     
            }) 
            .catch((error) => alert(error.message))
            
    }

    useEffect(() => {
        if(checkProfiles !== null){
            checkForProfile(userInfo.displayName)
        }
    }, [checkProfiles])

    useEffect(() => {

        if(userInfo !== null){
            setCheckProfiles(true)
            if(isNewProfile !== null){
                console.log(isNewProfile)
                
                if(isNewProfile === false){
                    
                    var profileNames = []
                
                    db.collection("profiles").onSnapshot(function(doc) {
                        doc.forEach((info) => {         
                            profileNames.push(info)   
                        })
                
                        for(let i = 0; i < profileNames.length; i++){
                            var curUserInfo = profileNames[i]
                   
                            if(curUserInfo.data().username === userInfo.displayName){
                                store.dispatch({
            
                                type: "ADD_POST",
                                    payload:
                                    {   
                                        username: curUserInfo.data().username,
                                        userphoto: userInfo.photoURL,
                                        userID: curUserInfo.id,
                                        likes: curUserInfo.data().likes,
                                        posts: curUserInfo.data().posts,
                                        bio: curUserInfo.data().bio
                                                
                                    }
                                })
  
                            }
                        }
            
                    })
                        
                }
                else{
                    
                    var userId = createProfile(userInfo.displayName)
                    updateState(userInfo.displayName, userInfo.photoURL, userId)         
                }  
            }
        }
        
    }, [userInfo, isNewProfile])



    function checkForProfile(username){
        
        let profileNames = []
      
        db.collection("profiles").get().then((doc) => {
            doc.forEach((info) => {       
                profileNames.push(info.data().username)
                    
            })
            console.log(profileNames)
            for(let i = 0; i < profileNames.length; i++){
                
                var name = profileNames[i]
          
                if(name === username){
                    setIsNewProfile(false)
                }
            
            }
           
            console.log("hi " + String(isNewProfile))
            if(isNewProfile === null){
                setIsNewProfile(true)
            }

        })

    }

    function createProfile(username){

        const post = {
            username: username,
            bio: "Edit your bio",
            likes: 0,
            posts: 0
        }      
        

        var number = Math.floor(Math.random() * 999999999)

        if(isNewProfile){
            
            db.collection("profiles").doc(String(number)).set(post)
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });    
       
        }
        //setUserID(String(number))
        return String(number)

    }

    function updateState(name, photoURL, userId){
       
        store.dispatch({
            type: "ADD_POST",
            payload:
            {   
                username: name,
                userphoto: photoURL,
                userID: userId,
                likes: 0,
                posts: 0,
                bio: "Edit your own personal bio!"
                      
            }
          })
    }


    return (
        <div id = "login-pos">
            <div className = "login-screen">
                <h1 id = "welcome"><i>Welcome to PhotoShare</i></h1>
                <p id = "slogan"><i>Share your moments with the world</i></p>
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

