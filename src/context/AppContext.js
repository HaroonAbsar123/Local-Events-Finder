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
import NetInfo from "@react-native-community/netinfo";
import * as NavigationBar from "expo-navigation-bar";
import * as Notifications from "expo-notifications";

import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { Platform } from "react-native";

const BACKGROUND_FETCH_TASK = "background-fetch-task";

export const AppContext = createContext({});

export function AppContextProvider({ children, fcmToken }) {
  const [isOnline, setIsOnline] = useState(false);
  const [onlineLoading, setOnlineLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [saved, setSaved] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);
  const [loadingOfflineData, setLoadingOfflineData] = useState(true);
  const [token, setToken] = useState(token);

  useEffect(() => {
    setToken(fcmToken);
  }, [fcmToken]);

  // TOKEN UPDATE

  useEffect(() => {
    async function updateToken() {
      try {
        await updateDoc(doc(db, "userList", userDetails?.userId), {
          token: token,
        });
      } catch (e) {
        console.error(e);
      }
    }

    if (userDetails?.userId) {
      updateToken();
    }
  }, [userDetails]);

  // __________________________REMINDER NOTIFICATION FUNCTIONS__________________________________

  const [reminderTime, setReminderTime] = useState("");

  const sendNotification = async (item) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Event Reminder",
        body: `Your event "${item.name.text}" is coming up soon!`,
        data: { eventId: item.id },
      },
      trigger: null,
    });
  };

  // _____________________________________________________________________

  // COLOR SCHEME LOAD
  useEffect(() => {
    async function fetchAndLoadColorScheme() {
      const colorScheme = await AsyncStorage.getItem("colorScheme");
      if (colorScheme === "dark" || colorScheme === "light") {
        Appearance.setColorScheme(colorScheme);
        NavigationBar.setButtonStyleAsync(
          colorScheme === "dark" ? "light" : "dark"
        );
        await NavigationBar.setBackgroundColorAsync(
          colorScheme === "dark" ? "#1e1e1e" : "#FFF"
        );
      }
    }
    fetchAndLoadColorScheme();
  }, []);

  // INITIALIZE OFFLINE DATA
  useEffect(() => {
    async function loadOfflineData() {
      setLoadingOfflineData(true);
      // Load offline data
      try {
        const [localEvents, localSaved] = await Promise.all([
          loadEventsFromDb(),
          loadSavedFromDb(),
        ]);

        // console.log("localEvents", localEvents)
        setEvents(localEvents);
        setEventsLoading(false);
        setSaved(localSaved);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingOfflineData(false);
      }
    }
    // if (!isOnline) {
    loadOfflineData();
    // }
  }, []);

  // SYNC SAVED STATE CHANGES WITH SQLITE
  useEffect(() => {
    async function saveIdsToSqlite() {
      await saveIdsToDb(saved);
    }
    if (!loadingOfflineData) {
      saveIdsToSqlite();
    }
  }, [saved]);

  // INITIALIZE TABLES
  const initializeData = useCallback(async () => {
    await createEventsTable();
    await createSavedTable();
  }, []);

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
      alert("Error loading events. Please check your network");
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
  const checkOnlineStatus = useCallback(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // setIsOnline(false)
      setIsOnline(state.isConnected && state.isInternetReachable);
      setOnlineLoading(false);
    });

    // Cleanup listener on unmount
    return () => {
      unsubscribe();
    };
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
        reminderTime,
        setReminderTime,
        sendNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// const [savedEvents, setSavedEvents] = useState([]);

// useEffect(() => {
//   setSavedEvents(events?.filter((item) => saved?.includes(item.id)));
// }, [saved, events]);

// useEffect(() => {
//   loadReminderTime();
//   loadEvents();
// }, []);

// useEffect(() => {
//   if (savedEvents?.length >= 1) {
//     AsyncStorage.setItem("savedEvents", JSON.stringify(savedEvents));
//     checkAndSendNotifications();
//   }
// }, [savedEvents, reminderTime]);

// const loadReminderTime = async () => {
//   try {
//     const savedTime = await AsyncStorage.getItem("reminderTime");
//     if (savedTime) {
//       setReminderTime(savedTime);
//     }
//   } catch (error) {
//     console.error("Failed to load reminder time from AsyncStorage", error);
//   }
// };

// const checkAndSendNotifications = () => {
//   if (!reminderTime) return;

//   const timeParts = reminderTime.split(" ");
//   const value = parseInt(timeParts[0]);
//   const unit = timeParts[1]?.toLowerCase();

//   savedEvents.forEach((item) => {
//     const eventDate = new Date(item?.start?.local);
//     let reminderDate;

//     if (unit?.includes("hour") || unit?.includes("hours")) {
//       reminderDate = new Date(eventDate.getTime() - value * 60 * 60 * 1000);
//     } else if (unit?.includes("minute") || unit?.includes("minutes")) {
//       reminderDate = new Date(eventDate.getTime() - value * 60 * 1000);
//     } else if (unit?.includes("day") || unit?.includes("days")) {
//       reminderDate = new Date(eventDate.getTime() - value * 24 * 60 * 60 * 1000);
//     }

//     if (new Date() >= reminderDate) {
//       console.log("item", item)
//       sendNotification(item);
//     }
//   });
// };

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// // Define the background task
// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
// try {
//   const reminderTime = await AsyncStorage.getItem("reminderTime");
//   const savedEventsJson = await AsyncStorage.getItem("savedEvents");
//   const savedEvents = JSON.parse(savedEventsJson);

//   if (savedEvents?.length >= 1 && reminderTime) {
//     const timeParts = reminderTime.split(" ");
//     const value = parseInt(timeParts[0]);
//     const unit = timeParts[1]?.toLowerCase();

//     savedEvents.forEach((item) => {
//       const eventDate = new Date(item?.start?.local);
//       let reminderDate;

//       if (unit?.includes("hour") || unit?.includes("hours")) {
//         reminderDate = new Date(eventDate.getTime() - value * 60 * 60 * 1000);
//       } else if (unit?.includes("minute") || unit?.includes("minutes")) {
//         reminderDate = new Date(eventDate.getTime() - value * 60 * 1000);
//       } else if (unit?.includes("day") || unit?.includes("days")) {
//         reminderDate = new Date(eventDate.getTime() - value * 24 * 60 * 60 * 1000);
//       }

//       if (new Date() >= reminderDate) {
//         sendNotification(item);
//       }
//     });
//   }

//   return BackgroundFetch.Result.NewData;
// } catch (error) {
//   console.error("Background task failed:", error);
//   return BackgroundFetch.Result.Failed;
// }
// });

// // Register the background fetch task
// async function registerBackgroundFetchAsync() {
// return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//   minimumInterval: 15 * 60, // 15 minutes
//   stopOnTerminate: false,
//   startOnBoot: true,
// });
// }

// // Unregister the background fetch task
// async function unregisterBackgroundFetchAsync() {
// return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
// }

// // Notification handler
// Notifications.setNotificationHandler({
// handleNotification: async () => ({
//   shouldShowAlert: true,
//   shouldPlaySound: true,
//   shouldSetBadge: true,
// }),
// });

// useEffect(() => {
// registerBackgroundFetchAsync();

// return () => {
//   unregisterBackgroundFetchAsync();
// };
// }, []);
