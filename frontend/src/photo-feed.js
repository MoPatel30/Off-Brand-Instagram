import React, {useState, useEffect} from 'react'
import "./photo-feed.css"
import {NewPost} from "./create-post"
import instance from "./axios"


function PhotoFeed() {

    return (
        <div className = "feed">

            <NewPost photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" description = "Hello world" user = "Mo Patel" timestamp = {Date.now()} />
            <NewPost photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" description = "Hello world" user = "Mo Patel" timestamp = {Date.now()} />
            <NewPost photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" description = "Hello world" user = "Mo Patel" timestamp = {Date.now()} />
            <NewPost photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" description = "Hello world" user = "Mo Patel" timestamp = {Date.now()} />
            <NewPost photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" description = "Hello world" user = "Mo Patel" timestamp = {Date.now()} />
        
        </div>
    )
}

// export default PhotoFeed


function PhotoFeedTwo(){
    const [posts, setPosts] = useState([])


    
    useEffect(() => {
        
        instance.get("http://localhost:3001/")
            .then((response) => {
            })
            .catch((error) => {
                console.log(error)
            })


        instance.get("/test") 
            .then((response) => {
                setPosts(response.data)
            })
            .catch((error) => {
                console.log(error)
            }) 
    }, [posts])
    


    return (
        <div className = "feed">
            {posts.map((post) => (
                <NewPost photo = {post.photo} description = {post.description} user = {post.name} timestamp = {post.timestamp} />    
            ))}  

        </div>
    )
}

export default PhotoFeedTwo

