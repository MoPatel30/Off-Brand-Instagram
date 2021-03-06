import React, {useState, useEffect} from 'react'
import "./PhotoFeed.css"
import {NewPost} from "../CreatePost/CreatePost"
import db from "../firebase"
import {connect} from "react-redux"



function PhotoFeed({username}) {

    const [fbPost, setFbPost] = useState([])

    useEffect(() => {
        db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setFbPost(snapshot.docs.map(doc => doc.data()))        
        })
       
    })

 
    return (
        <div className = "feed">

            {
            fbPost.map((post) => (
                <NewPost username = {username} name = {post.name} id = {post.id} photo = {post.photo} description = {post.description} user = {post.name} date = {post.date} likes = {post.likedBy.length} likedBy = {post.likedBy} />    
            ))} 
          
        </div>
    )
}


const mapStateToProps = state => {
    return{
        username: state.username
    }
}

export default connect(mapStateToProps)(PhotoFeed)

