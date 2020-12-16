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
      <div className = "header">
        <nav id = "header" className = "navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <h1 style = {{color: "white", textAlign: "center", fontSize: "2rem"}}><i>Off-Brand Instagram</i></h1>
          <h1 style = {{color: "white", textAlign: "center", fontSize: "1.5rem"}}> Welcome, {user}!</h1>
            
            <div className = "buttons">
              <Button className = "buttons" variant="contained" cursor = "pointer" color="primary" href="">
                Feed
              </Button>
              <Button className = "buttons" variant="contained" cursor = "pointer" color="primary" href="">
                Profile
              </Button>
              <Button className = "buttons" variant="contained" cursor = "pointer" color="secondary" href="/login">
                Logout
              </Button>
              <Button className = "buttons"  onClick = {signIn} cursor = "pointer" variant="contained" color="primary" href="">
                Login
              </Button>
            </div>        
        </nav>
      </div>

      <div className = "App-body">

        <div id = "post-btn">
          <CreatePost user = {user} /> 
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