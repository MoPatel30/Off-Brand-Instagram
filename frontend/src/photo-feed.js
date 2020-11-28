import React from 'react'
import "./photo-feed.css"
import {NewPost} from "./create-post"


function PhotoFeed() {
    return (
        <div className = "feed">
            <NewPost />
            <NewPost />
            <NewPost />
            <NewPost />
        </div>
    )
}

export default PhotoFeed
