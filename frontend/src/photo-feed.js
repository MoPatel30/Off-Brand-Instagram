import React, {useState, useEffect} from 'react'
import "./photo-feed.css"
import {NewPost} from "./create-post"
import instance from "./axios"

/*
function PhotoFeed() {
    const [posts, setPosts] = useState([])
 
    axios.get("/posts/")
        .then((response) => {
            setPosts(response.data)
        })
    console.log(posts)
    

    return (
        <div className = "feed">
            {posts.map((post) => (
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

export default PhotoFeed
*/

export class PhotoFeedTwo extends React.Component{
    constructor(){
        super()
        this.state = {
            posts: []
        }
        this.showPost()
        console.log(this.state.posts)
    }

    showPost = () => {
        instance.get("/posts/") 
            .then((response) => {
                this.setState({
                    posts: response.data
                })
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
            
    }


    render() {
        return (
            <div className = "feed">
                {this.state.posts.map((post) => (
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
}


