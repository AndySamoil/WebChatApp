import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as ROUTES from '../constants/routes';
import {AuthContext} from "../firebase/context";

export default function Login() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  // get email and password from textboxes
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  // check if email and password are valid
  const [error, setError] = useState('');
  const isInvalid = password == '' || emailAddress == '';

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('here');
    try{
      
        console.log('meao');
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, emailAddress, password);
        console.log(user.uid);
        console.log(auth.currentUser.uid);
        console.log("Valid User");
        navigate(ROUTES.HOME);
    } catch (error){

        setEmailAddress('');
        setPassword('');
        setError(error.message);
    }
};

function doSomething(){
  console.log('done');
}


  // sets tab title
  useEffect(() => {
    document.title = 'Login - ChatApp';
  }, []);

  return (
    <div>
      
      <div className="container">
        <h2>Login</h2>
        {error && <p className="m-4 text-xs text-red">{error}</p>}
        <form className="form-horizontal" onSubmit={handleLogin} method="POST" >
          <div className="form-group"> <label className="control-label col-sm-2">User Name</label>
            <div className="col-sm-2"> <input type="email" autoFocus className="form-control" id="email" placeholder="Enter email" onChange={({ target }) => setEmailAddress(target.value)} /> </div>
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
    </div>

  )
}