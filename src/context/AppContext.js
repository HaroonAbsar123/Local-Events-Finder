import React, { createContext, useEffect, useState, useCallback } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  createEventsTable,
  saveEventsToDb,
  loadEventsFromDb,
} from "../sqlite/SyncEvents";
import {
  createSavedTable,
  saveIdsToDb,
  loadSavedFromDb,
  clearSavedTable,
} from "../sqlite/SyncSaved";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [isOnline, setIsOnline] = useState(false);
  const [onlineLoading, setOnlineLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [saved, setSaved] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  // COLOR SCHEME LOAD
  useEffect(() => {
    async function fetchAndLoadColorScheme() {
      const colorScheme = await AsyncStorage.getItem("colorScheme");
      if (colorScheme === "dark" || colorScheme === "light") {
        Appearance.setColorScheme(colorScheme);
      }
    }
    fetchAndLoadColorScheme();
  }, []);

  // INITIALIZE OFFLINE DATA
  useEffect(() => {
    async function loadOfflineData() {
      // Load offline data
      const [localEvents, localSaved] = await Promise.all([
        loadEventsFromDb(),
        loadSavedFromDb(),
      ]);

      // console.log("localEvents", localEvents)
      setEvents(localEvents);
      setEventsLoading(false);
      setSaved(localSaved);
    }
    if (!isOnline) {
      loadOfflineData();
    }
  }, [isOnline]);

  // SYNC SAVED STATE CHANGES WITH SQLITE
  useEffect(() => {
    async function saveIdsToSqlite() {
      await saveIdsToDb(saved);
    }
    saveIdsToSqlite();
  }, [saved]);

  // SYNC EVENTS STATE CHANGES WITH SQLITE
  // useEffect(() => {
  //   async function saveEventsToSqlite(){
  //     await saveEventsToDb(events);
  //   }
  //   saveEventsToSqlite();
  // }, [events])

  // INITIALIZE TABLES
  const initializeData = useCallback(async () => {
    await createEventsTable();
    await createSavedTable();
  }, [userDetails]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // EVENTS FETCH / SYNC FROM API TO SQLITE
  const loadEvents = async () => {
    try {
      // Fetch events from API
      const response = await fetch(
        "https://www.eventbriteapi.com/v3/organizations/1466912144973/events?token=NBTMWUACKFEOM2VLR6IJ"
      );
      const data = await response.json();

      console.log("Events feteched from API");
      setEvents(data.events);
      await saveEventsToDb(data.events);
    } catch (error) {
      console.error("Error syncing data:", error);
      setEventsError(error);
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails?.userId && isOnline) {
      loadEvents();
    }
  }, [isOnline, userDetails?.userId]);

  // SYNC SAVED ARRAY TO FIRESTORE
  useEffect(() => {
    const syncSavedToSQLiteAndFirestore = async () => {
      const userDocRef = doc(db, "userList", userDetails.userId);
      await updateDoc(userDocRef, { saved });
    };

    if (isOnline && userDetails?.userId) {
      syncSavedToSQLiteAndFirestore();
    }
  }, [saved, isOnline, userDetails?.userId]);

  // LOAD USER DATA
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserDetails(null);
        setSaved([]);
        await clearSavedTable();
        return;
      }

      const userId = user.uid;
      const userDocRef = doc(db, "userList", userId);

      const unsubscribeSnapshot = onSnapshot(
        userDocRef,
        async (doc) => {
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

      return unsubscribeSnapshot;
    });

    return unsubscribeAuth;
  }, []);

  // CHECK ONLINE STATUS
  const checkOnlineStatus = useCallback(async () => {
    try {
      const response = await fetch("https://www.google.com");
      setIsOnline(response.ok);
      // setIsOnline(false);
    } catch {
      setIsOnline(false);
    } finally {
      setOnlineLoading(false);
    }
  }, []);

  useEffect(() => {
    checkOnlineStatus();
  }, [checkOnlineStatus]);

  return (
    <AppContext.Provider
      value={{
        userDetails,
        setUserDetails,
        events,
        setEvents,
        eventsLoading,
        setEventsLoading,
        eventsError,
        setEventsError,
        saved,
        setSaved,
        isOnline,
        onlineLoading,
        loadEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
