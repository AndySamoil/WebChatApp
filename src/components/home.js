import { AuthContext } from "../firebase/context";
import { useState, useContext, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import env from "react-dotenv";

export default function Home() {
    const Curuser = useContext(AuthContext);

    const [photoURL, setPhotoURL] = useState("");
    const [uploadedPhoto, setUploadedPhoto] = useState(null);

    const state = {
        selectedFile: null
    }

    

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
            console.log(env.measurementId);
            const pathReference = await getDownloadURL(ref(storage, 'ProfileImages/'+ String(Curuser.user.uid)));
            console.log(pathReference);
            setPhotoURL(pathReference);
        } catch (e) {
            console.log(e)
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
            { photoURL ? (
                <>
                <p>Yes Photo</p>
                
                <img className="rounded" src={photoURL} alt=""/>
                </>
            ) : (
                <p>No Photo</p>
            )};
            <button onClick={pri}>Click Me!</button>


        </div>
        
    )
}