import { AuthContext } from "../firebase/context";
import React, { useState, useContext, useEffect } from "react";
import { getAuth, reload } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import env from "react-dotenv";
import { firestoreDB } from "../firebase/config";
import { addDoc, collection, getDocs, doc, onSnapshot, serverTimestamp, query, orderBy, limit, limitToLast, deleteDoc } from "firebase/firestore"; 
import { useCollectionData } from "react-firebase-hooks/firestore";


export default function Home() {
    const Curuser = useContext(AuthContext);

    const chatRef = collection(firestoreDB, "chat");

    const q = query(chatRef, orderBy('createdAt'), limitToLast(6));

    const [messages] = useCollectionData(q); 
    // const [values, loading, error] = useCollectionData<T> (query, options);

    const [photoURL, setPhotoURL] = useState("");
    const [uploadedPhoto, setUploadedPhoto] = useState(null);

    const [message, setMessage] = useState("");
    const [display, setDisplay] = useState("");

    const [state, setState] = useState([]);

    useEffect(() => {
        pri();
        //chatHandler();
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

    const deleteEverything = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestoreDB, "chat"));
            console.log("tried")
            querySnapshot.forEach((docArg) => {
                console.log(docArg.id);
                
                //const docref = doc(firestoreDB, "chat", docArg.id);
                //const docsnap = await getDoc(docref);
                deleteDoc(doc(firestoreDB, "chat", docArg.id));
            });

        // chatRef.forEach((doc) => {
        //     deleteDoc(doc(firestoreDB, "chat", doc));
        //});
        } catch (e) {
            console.log("delete failed", e);
        }
    }

    async function pri(){
        try {
            const pathReference = await getDownloadURL(ref(storage, 'ProfileImages/'+ String(Curuser.user.uid)));
            setPhotoURL(pathReference);
            console.log("image set");
            chatHandler();
        } catch (e) {
            console.log(e);
            console.log("image not set");
        }

    }

    function addMessage(e) {
        CreateNewChat(e);
        //setState([...state, {name:message, photo:photoURL}]);
        setMessage("");
    }

    const checkenter = (e) => {
        if (e.key == 'Enter') {
            console.log(e.item);
            addMessage(e);
        }
    }

    async function chatHandler() {
        //const auth = getAuth();    
    
        //const db = getFirestore();
        const querySnapshot = await getDocs(collection(firestoreDB, "chat"));
        //const q = querySnapshot.orderBy('createdAt')
        console.log(querySnapshot.docs[0].data());
        
        //const [curs] = useCollectionData(querySnapshot, { idField: 'id'});

        const arr = [];
        querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        arr.push(doc.data())
        });
        console.log(arr)
        setState(arr);


    }

    const CreateNewChat = async (event) => {
        event.preventDefault();
        console.log("some Success");
        try {
          const auth = getAuth();    
    
          //const db = getFirestore();
          const chatCol = collection(firestoreDB, "chat");
    
          //console.log(usersCol);
          await addDoc(chatCol, {
            userId: auth.currentUser.uid,
            message: message,
            createdAt: serverTimestamp(),
            PhotoURL: photoURL
          });
          console.log("added New Chat");
          console.log(message);
    
    
    
        } catch (error) {
          console.log(error);

        }
      }

    const handleuserinput = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div>
            Home Page <br/>
            <div>
                <button onClick={() => console.log(Curuser.user.uid)}> Click Here </button>
            </div>
            <button onClick={deleteEverything}> Refresh </button>
            <button onClick={fileUploadHandler}> Upload </button>
            <input type="file" onChange={fileSelectedHandler}/>
            {/* {Curuser.user.uid} <br/> */}
            {/* <img src = />  onChange={({ target }) => setMessage(target.value)}*/}
            <div>
                <ul>
                    {messages && messages.map(item => {
                    return(
                        <div>
                        <p key={item.message}>{item.message}</p>
                        <img src={item.PhotoURL} alt="joe" width="100" height="100"/>
                        </div>
                        );
                    })}
                </ul>
            </div>
            <input type="text" value={message} onKeyPress={(e) => checkenter(e)} onChange={handleuserinput}/>
            <button onClick={addMessage}>Send</button>
            <button onClick={chatHandler}>Chats</button>


        </div>
        
    )
}