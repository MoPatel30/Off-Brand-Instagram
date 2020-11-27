import React from "react"
import "./create-post.css"
import AddBoxIcon from '@material-ui/icons/AddBox';


function CreatePost() {
    return (
        <div>
            <AddBoxIcon fontSize = "large" />
            
        </div>
    )
}

export default CreatePost




export function NewPost(){
    return(
        <div>
            <div className = "post-body">
                <div className = "post-header">
                    <h3>Posted by Mo Patel</h3>
                    <h3>3 minutes ago</h3>
                </div>

                <div className = "post-img">
                    <img src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" />
                </div>

                <div className = "post-description">
                    <p><b>Description: </b> This is some long, fancy, maybe cool description </p>
                </div>

            </div>

        </div>
    )
}