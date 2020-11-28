import React, {useState} from "react"
import "./create-post.css"
import AddBoxIcon from '@material-ui/icons/AddBox';


function CreatePost() {
    const [form, setForm] = useState("")
    
    const makePost = (e) => {
        e.preventDefault()
        setForm(<MakePostForm />)
    }

    return (
        <div>
            <AddBoxIcon fontSize = "large" onClick = {makePost} />
            
            <div>
                <p>{form}</p>
            </div>

        </div>
    )
}

export default CreatePost





export function MakePostForm(){
    const date = String((new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + (new Date().getFullYear()))
   
    const [pic, setPic] = useState("")
    const [desc, setDesc] = useState("")
    const [name, setName] = useState("Mo Patel")
    const [time, setTime] = useState("")

    const [post, setPost] = useState("")

    const postPicture = (e) => {
        e.preventDefault()

        
        setTime(date)

        console.log(setPic)
        console.log(setDesc)
        console.log(setName)
        console.log(setTime)

        setPost(<NewPost photo = {document.getElementById("display-image").src} description = {desc} user = {name} timestamp = {time} />)

    }   


    const handleImageUpload = (e) => {
        e.preventDefault()
        
        var image = document.getElementById("picture").files[0];
        setPic(image)
        console.log(setPic)
        var reader = new FileReader();

        reader.onload = function(e) {
        document.getElementById("display-image").src = e.target.result;
        }

        reader.readAsDataURL(image);

    }


    return(
        <div className = "post-form">
            <form type = "submit">
                <h2 id = "username">Mo Patel</h2>
                <p id = "timestamp">{date}</p>
                <div className = "input-forms">
                    <label className = "label-forms">Upload Photo: </label>
                    <input id = "picture" type="file" onChange = {handleImageUpload}/>
                    <label className = "label-forms">Description: </label>
                    <input id = "description" type="text" onChange = {(e) => {setDesc(e.target.value)}}/>
                </div>
                <button type = "submit" onClick = {postPicture}> Post </button>

            </form>

            <p>{post}</p>
            <img id = "display-image" alt = "pic" src="" style = {{width: "400px", height: "400px"}} />
    
        </div>
    )
   
}




export function NewPost(props){
    const date = String((new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + (new Date().getFullYear()))

    function displayPicture(pic) {

        var reader = new FileReader();

        reader.onload = function() {
        document.getElementById("display-image").src = pic;
        }

        reader.readAsDataURL(pic);

    }
    //displayPicture(props.photo)
    
    return(
       
        <div>
        
            <div className = "post-body">
                <div className = "post-header">
                    <h2>{props.user}</h2>
                    <h2>{date}</h2>
                </div>

                <div className = "post-img">
                    <img alt = "flower" src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1" />
                    <img id = "display-image" alt = "pic" src= {props.photo} style = {{width: "400px", height: "400px"}} />
                </div>

                <div className = "post-description">
                    <p><b> Description: </b> {props.description} </p>
                </div>

            </div>

        </div>
    )
}

//https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xorA8_bHWQVZaLi-mGEnPQHaFk%26pid%3DApi&f=1