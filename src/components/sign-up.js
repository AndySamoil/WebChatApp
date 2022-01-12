import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as ROUTES from '../constants/routes';
import { AuthContext } from "../firebase/context";
import { addDoc, collection } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { firestoreDB } from "../firebase/config";


export default function SignUp() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  // get email and password from textboxes
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  // check if email and password are valid
  const [error, setError] = useState('');
  const isInvalid = password == '' || emailAddress == '';

  const CreateUser = async (event) => {
    event.preventDefault();
    console.log("some Success");
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, emailAddress, password);

      console.log(auth.currentUser.uid);

      console.log(user);

      //const db = getFirestore();
      const usersCol = collection(firestoreDB, "users");

      console.log(usersCol);
      await addDoc(usersCol, {
        email: auth.currentUser.email,
        photoId: "default.png",
        userId: auth.currentUser.uid
      });
      console.log("added Doc");
      navigate(ROUTES.HOME);



    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
      setEmailAddress('');
      setPassword('');
    }
  }

  // sets tab title
  useEffect(() => {
    document.title = 'SignUp - ChatApp';
  }, []);

    return (
        <div className="container mx-auto m-3" >
          <h2>Sign Up</h2>
          {error && <p className="mb-4 text-xs text-red">{error}</p>}
          <form className="form-horizontal" onSubmit={CreateUser} method="POST">
            <div className="form-group"> <label className="control-label col-sm-2" >User Name</label>
              <div className="col-sm-2"> <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={({ target }) => setEmailAddress(target.value)} /> </div>
            </div>
            <div className="form-group"> <label className="control-label col-sm-2" >Password</label>
              <div className="col-sm-2"> <input type="password" className="form-control" id="pwd" placeholder="Enter password" onChange={({ target }) => setPassword(target.value)}/> </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <div className="checkbox"> <label><input type="checkbox" /> Remember me</label> </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10"> <button disabled={isInvalid} type="submit" className="btn btn-primary">Submit</button> </div>
            </div>
          </form>
          <p className="text-sm">
              Don't have an account?{' '}
              <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                  Sign up
              </Link>
          </p>
        </div>
        
    )
}