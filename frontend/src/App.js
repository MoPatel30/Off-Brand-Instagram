import React, {useState} from "react"
import './App.css';
import CreatePost, {MakePostForm, NewPost} from "./create-post"
import {PhotoFeed} from "./photo-feed";
import "bootstrap/dist/css/bootstrap.min.css";
import {auth, provider} from "./firebase"
import Button from '@material-ui/core/Button';
import Login from './Login'
import {connect} from 'react-redux';



function App({ username }) {
  // const [user, setUser] = useState(username)
  const [form, setForm] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  console.log(username)


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


  return (
    <div className="App">
      { username ? 
      <div className = "header">
        <nav id = "header" className = "navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          
          <h1 style = {{color: "white", textAlign: "center", fontSize: "2rem"}}><i>Off-Brand Instagram</i></h1>
          <h1 style = {{color: "white", textAlign: "center", fontSize: "1.5rem"}}> Welcome, {username}!</h1>
 
            <div className = "buttons">
            <Button onClick = {makePost} className = "buttons" variant="contained" cursor = "pointer" color="secondary" href="">
                Post
              </Button>
              <Button className = "buttons" variant="contained" cursor = "pointer" color="primary" href="">
                Feed
              </Button>
              <Button className = "buttons" variant="contained" cursor = "pointer" color="primary" href="">
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