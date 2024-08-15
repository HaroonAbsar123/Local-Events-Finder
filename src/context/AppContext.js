import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUserDetails(null);
        return;
      }
  
      const userId = user.uid;
      const userDocRef = doc(db, "userList", userId);
  
      const unsubscribeSnapshot = onSnapshot(
        userDocRef,
        (doc) => {
          if (doc.exists()) {
            setUserDetails(doc.data());
          } else {
            console.log("User not found in Firestore");
            setUserDetails(null);
          }
        },
        (error) => {
          console.error("Error fetching user data:", error);
          setUserDetails(null);
        }
      );
  
      // Cleanup the Firestore listener when the auth state changes
      return () => {
        unsubscribeSnapshot();
      };
    });
  
    // Cleanup the auth listener when the component unmounts
    return () => {
      unsubscribeAuth();
    };
  }, [auth]);
  

  return (
    <AppContext.Provider
      value={{
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
