import React, {useState} from "react"
import './App.css';
import CreatePost, {NewPost} from "./create-post"
import {PhotoFeed} from "./photo-feed";
import "bootstrap/dist/css/bootstrap.min.css";
import {auth, provider} from "./firebase"
import Button from '@material-ui/core/Button';



function App() {
  const [user, setUser] = useState("")


  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>{
        console.log(result)
        console.log(result.user.displayName)
        setUser(result.user.displayName)
        
    })
  }


  return (
    <div className="App">

      <nav className = "navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <h1 style = {{color: "white", textAlign: "center"}}><i>Off-Brand Instagram</i></h1>
        <h1 style = {{color: "white", textAlign: "center"}}> Welcome, {user}!</h1>
         
          <Button variant="contained" cursor = "pointer" color="primary" href="#contained-buttons">
            Feed
          </Button>
          <Button variant="contained" cursor = "pointer" color="primary" href="#contained-buttons">
            Profile
          </Button>
          <Button variant="contained" cursor = "pointer" color="primary" href="#contained-buttons">
            Logout
          </Button>
          <Button onClick = {signIn} cursor = "pointer" variant="contained" color="primary" href="#contained-buttons">
            Login
          </Button>

      </nav>

      <div className = "App-body">

        <div id = "post-btn">
          <CreatePost /> 
        </div>

        <div id = "feed">
          <PhotoFeed user = {user} />
        </div>
        
      </div>
    
    </div>
  );
}

export default App;


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