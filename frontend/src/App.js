import React, {useState} from "react"
import './App.css';
import MakePostForm, { ModalPost} from "./create-post"
import {PhotoFeed} from "./photo-feed";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import Login from './Login'
import {connect} from 'react-redux';
import Profile from "./Profile";



function App({ username }) {
  // const [user, setUser] = useState(username)
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
            <Button onClick = {makePost} className = "buttons" variant="contained" cursor = "pointer" color="secondary" href="">
                Post
              </Button>
              <Button className = "buttons" variant="contained" cursor = "pointer" color="primary" href="">
                Feed
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
          <PhotoFeed user = {username} />
        </div>
        :(
          <p></p>
        )
      }
        <div>
          {form}
        </div>
        
        {
        profile ? 
          <Profile />
        :(
           <p>f</p>
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


/*

   <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" cursor = "pointer" onClick = {signIn()}>Logout</a>
            </li>
          </ul>


*/