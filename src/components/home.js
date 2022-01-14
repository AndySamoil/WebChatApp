import { AuthContext } from "../firebase/context";
import React, { useState, useContext, useEffect } from "react";
import { getAuth, reload } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import env from "react-dotenv";

export default function Home() {
    const Curuser = useContext(AuthContext);

    const [photoURL, setPhotoURL] = useState("");
    const [uploadedPhoto, setUploadedPhoto] = useState(null);

    const [message, setMessage] = useState("");
    const [display, setDisplay] = useState("");

    const [state, setState] = useState([]);

    useEffect(() => {
        pri();
    }, [])

    const fileSelectedHandler = event => {
        // this.setState({
        //     selectedFile:event.target.files[0],
        // });
        setUploadedPhoto(event.target.files[0]);
        //console.log(event)

        console.log(event.target.files[0])
    }

    const fileUploadHandler = () => {
        if (uploadedPhoto == null) {
            console.log("A Photo was never uploaded");
        } else {
            console.log(uploadedPhoto);
            const storageRef = ref(storage, 'ProfileImages/' + String(Curuser.user.uid));
            uploadBytes(storageRef, uploadedPhoto).then((snapshot) => {
                console.log('Uploaded a blob or file!');
              });
        }
    }

    async function pri(){
        try {
            const pathReference = await getDownloadURL(ref(storage, 'ProfileImages/'+ String(Curuser.user.uid)));
            console.log(pathReference);
            setPhotoURL(pathReference);
        } catch (e) {
            console.log(e)
        }

    }

    function addMessage(e) {
        setState([...state, {name:message, photo:photoURL}]);
    }

    const checkenter = (e) => {
        if (e.key == 'Enter') {
            addMessage(e);
        }
    }

    return (
        <div>
            Home Page <br/>
            <div>
                <button onClick={() => console.log(Curuser.user.uid)}> Click Here </button>
            </div>
            <button onClick={fileUploadHandler}> Upload </button>
            <input type="file" onChange={fileSelectedHandler}/>
            {/* {Curuser.user.uid} <br/> */}
            {/* <img src = /> */}
            <div>
                <ul>
                    {state.map(item => {
                    return(
                        <div>
                        <p key={item.name}>{item.name}</p>
                        <img src={item.photo} alt="joe" width="100" height="100"/>
                        </div>
                        );
                    })}
                </ul>
            </div>
            <input type="text" onKeyPress={(e) => checkenter(e)} onChange={({ target }) => setMessage(target.value)}/>
            <button onClick={addMessage}>Send</button>


        </div>
        
    )
}