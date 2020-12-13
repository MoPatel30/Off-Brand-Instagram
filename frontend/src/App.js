import React, {useState} from "react"
import './App.css';
import CreatePost, {NewPost} from "./create-post"
import {PhotoFeed} from "./photo-feed";
import "bootstrap/dist/css/bootstrap.min.css";
import {auth, provider} from "./firebase"


function App() {
  const [user, setUser] = useState("")

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>{
        setUser(result.nwme)
        
    })
  }

  return (
    <div className="App">

      <nav className = "navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <h1 style = {{color: "white", textAlign: "center"}}><i>Off-Brand Instagram</i></h1>

          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick = {signIn()}>Login</a>
            </li>
          </ul>
          <button onClick = {signIn}>
            login
          </button>
          <h1>{user}</h1>
      </nav>

      <div className = "App-body">

        <div id = "post-btn">
          <CreatePost /> 
        </div>

        <div id = "feed">
          <PhotoFeed />
        </div>


      </div>
    
    </div>
  );
}

export default App;
