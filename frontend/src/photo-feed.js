import React, {useState, useEffect} from 'react'
import "./photo-feed.css"
import {NewPost} from "./create-post"
import axios from "axios"
import db from "./firebase"

export function PhotoFeed() {

    const [fbPost, setFbPost] = useState([])
    
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
                <NewPost photo = {post.photo} description = {post.description} user = {post.name} timestamp = {post.timestamp} />    
            ))} 
                 
            <NewPost photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" description = "Hello world" user = "Mo Patel" timestamp = {Date.now()} />
            <NewPost photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" description = "Hello world" user = "Mo Patel" timestamp = {Date.now()} />
            <NewPost photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" description = "Hello world" user = "Mo Patel" timestamp = {Date.now()} />
            <NewPost photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" description = "Hello world" user = "Mo Patel" timestamp = {Date.now()} />
            <NewPost photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" description = "Hello world" user = "Mo Patel" timestamp = {Date.now()} />
        
        </div>
    )
}

