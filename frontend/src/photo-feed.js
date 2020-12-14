import React, {useState, useEffect} from 'react'
import "./photo-feed.css"
import {NewPost} from "./create-post"
import axios from "axios"
import db from "./firebase"


export function PhotoFeed(props) {

    const [fbPost, setFbPost] = useState([])
    const [id, setId] = [""]


    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setFbPost(snapshot.docs.map(doc => doc.data()))
            
        })
        console.log(fbPost)

    }, [])


    return (
        <div className = "feed">

            {
            fbPost.map((post) => (
                <NewPost name = {props.user} id = {post.id} photo = {post.photo} description = {post.description} user = {post.name} timestamp = {post.timestamp} likes = {post.likes} likedBy = {post.likedBy} />    
            ))} 
           
        </div>
    )
}

