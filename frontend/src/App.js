import React, {useState} from "react"
import './App.css';
import MakePostForm from "./CreatePost/CreatePost"
import PhotoFeed from "./PhotoFeed/PhotoFeed";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import Login from './Login/Login'
import {connect} from 'react-redux';
import Profile from "./Profile/Profile";



function App({ username }) {

  const [form, setForm] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [profile, setProfile] = useState(false)

  const makePost = (e) => {
      e.preventDefault()
      if(!submitted){
          setForm(<MakePostForm user = {username} />)
          setSubmitted(true)
      }
      else{
          setForm(null)
          setSubmitted(false)
      }

  }

  const showProfile = (e) => {
    e.preventDefault()
    if(!profile){
      setProfile(true)
    }
    else{
      setProfile(false)
    }

  }



  return (
    <div className="App">
      { username ? 
      <div className = "header">
        <nav id = "header" className = "navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          
          <div id = "title-header">
            <h1 style = {{color: "white", textAlign: "left", fontSize: "2rem"}}><i>PhotoShare</i></h1>
          </div>

          <div id = "welcome-header">
            <h1 style = {{color: "white", textAlign: "center", fontSize: "1.5rem"}}> Welcome, {username}!</h1>
          </div>
 
            <div className = "buttons">
            <Button onClick = {makePost} className = "buttons" variant="contained" cursor = "pointer" color="primary" href="">
                Post
              </Button>
              <Button onClick = {showProfile} className = "buttons" variant="contained" cursor = "pointer" color="primary" href="">
                Profile
              </Button>
              <Button className = "buttons" variant="contained" cursor = "pointer" color="secondary" href="/login">
                Logout
              </Button>
        
            </div>   
                 
        </nav>
      </div>
        :(
          <Login />
        )
      }

      
      <div className = "App-body">
      { username ? 
        <div id = "feed">
          <PhotoFeed />
        </div>
        :(
          <p></p>
        )
      }
        <div id = "form-pos">
          {form}
        </div>
        
        {
        profile ? 
          <div id = "profile-pos">
            <Profile />
          </div>
        :(
           <p></p>
        )
        }
     
      </div>     
   
    </div>
  )
}


const mapStateToProps = state => {
  return {username: state.username}
}


export default connect(mapStateToProps)(App);

