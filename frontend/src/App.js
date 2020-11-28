import React from "react"
import './App.css';
import CreatePost, {NewPost} from "./create-post"
import PhotoFeed from "./photo-feed";


function App() {
  return (
    <div className="App">
      <h2> Off-Brand Instagram </h2>
      
      <div className = "App-body">
        <CreatePost />
        
        <PhotoFeed />

      </div>
    
    </div>
  );
}

export default App;
