import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';
import 'firebase/auth';

// Firebase Hooks
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionDate } from "react-firebase-hooks/firestore"

import Login from "./components/login";
import Home from "./components/home";
import SignUp from "./components/sign-up";

function App() {
  
  const [counter, setCounter] = useState(0);
  // const [user, setUser] = useState(null);
  //const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/sign-up">Sign-Up</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/login" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Login
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="/">Action</a></li>
                  <li><a className="dropdown-item" href="/">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="/">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>


      <div className="container mt-3">
        <Routes>
          <Route path ={"/"} element={<Login/>} />
          <Route path ={"/home"} element={<Home/>} />
          <Route path ={"/sign-up"} element={<SignUp/>} />
          <Route path ={"/login"} element={<Login/>} />

        </Routes>
      </div>

  </div>
  );
}

export default App;
