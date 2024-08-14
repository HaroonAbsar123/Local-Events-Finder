import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userId = await AsyncStorage.getItem("userId");

        if (!userId) {
          setUserDetails(null);
          return;
        }

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

        // Return the unsubscribe function to clean up the listener
        return unsubscribeSnapshot;
      } catch (error) {
        console.error("Error in fetchUserData:", error);
        setUserDetails(null);
      }
    }

    fetchUserData();
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
