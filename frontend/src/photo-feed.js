import React, {useState, useEffect} from 'react'
import "./photo-feed.css"
import {NewPost} from "./create-post"
import db from "./firebase"
import {connect} from "react-redux"



function PhotoFeed({username}, props) {

    const [fbPost, setFbPost] = useState([])


    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setFbPost(snapshot.docs.map(doc => doc.data()))
            
        })
        console.log(fbPost)

    })

 
    return (
        <div className = "feed">

            {
            fbPost.map((post) => (
                <NewPost username = {username} name = {props.user} id = {post.id} photo = {post.photo} description = {post.description} user = {post.name} timestamp = {post.timestamp} likes = {post.likedBy.length} likedBy = {post.likedBy} />    
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

