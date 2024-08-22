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
} from "../sqlite/SyncSaved";

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [isOnline, setIsOnline] = useState(false);
  const [onlineLoading, setOnlineLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [saved, setSaved] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  const initializeData = useCallback(async () => {
    await createEventsTable();
    await createSavedTable();

    // Load offline data
    const [localEvents, localSaved] = await Promise.all([
      loadEventsFromDb(),
      loadSavedFromDb(),
    ]);

    setEvents(localEvents);
    setEventsLoading(false);
    setSaved(localSaved);

    if (localSaved.length === 0 && isOnline && userDetails?.userId) {
      const firestoreSaved = userDetails?.saved || [];

      await saveIdsToDb(firestoreSaved);
      setSaved(firestoreSaved);
    }
  }, [isOnline, userDetails]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    const initializeEvents = async () => {
      if (isOnline) {
        try {
          // Fetch events from API
          const response = await fetch(
            "https://www.eventbriteapi.com/v3/organizations/1466912144973/events?token=NBTMWUACKFEOM2VLR6IJ"
          );
          const data = await response.json();

          setEvents(data.events);
          await saveEventsToDb(data.events);
        } catch (error) {
          console.error("Error syncing data:", error);
          setEventsError(error);
        }
      }
    };

    if (userDetails?.userId) {
      initializeEvents();
    }
  }, [isOnline, userDetails?.userId]);

  useEffect(() => {
    const syncSavedToSQLite = async () => {
      await saveIdsToDb(saved);

      if (isOnline && userDetails?.userId) {
        const userDocRef = doc(db, "userList", userDetails.userId);
        await updateDoc(userDocRef, { saved });
      }
    };

    if (saved.length >= 0) {
      syncSavedToSQLite();
    }
  }, [saved, isOnline, userDetails?.userId]);

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

      return unsubscribeSnapshot;
    });

    return unsubscribeAuth;
  }, []);

  const checkOnlineStatus = useCallback(async () => {
    try {
      const response = await fetch("https://www.google.com");
      // setIsOnline(response.ok);
      setIsOnline(false);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
