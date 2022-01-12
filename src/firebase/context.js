//1.
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import app from "./config";

//2.
export const AuthContext = React.createContext();

//3.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
