import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContent = React.createContext();

export function useAuth() {
  return useContext(AuthContent);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
  
    // Fix the typo in the function name here
    function signup(email, password) {
      return auth.createUserWithEmailAndPassword(email, password);
    }
  
    useEffect(() => {
      const unsuscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
      });
      return unsuscribe;
    }, []);
  
    const value = {
      currentUser,
      signup
    };
    return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>;
  }
  

  
// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState();
//   function signup(email, password) {
//     return auth.createUserWithEmailAndPassword(email, password);
//   }

//   useEffect(() => {
//     const unsuscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//     });
//     return unsuscribe;
//   }, []);

//   const value = {
//     currentUser,
//     signup,
//   };
//   return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>;
// }
