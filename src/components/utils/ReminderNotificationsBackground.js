import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { loadEventsFromDb, markAsNotified } from "../../sqlite/SyncEvents";
import { parseISO, differenceInMilliseconds, subMonths } from "date-fns";
import { loadSavedFromDb } from "../../sqlite/SyncSaved";

const BACKGROUND_FETCH_TASK = "background-fetch-task";

// Define the background fetch task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  console.log("Background task is running.");

  try {
    const reminderTime = await AsyncStorage.getItem("reminderTime");
    console.log("Reminder time:", reminderTime);

    const events = await loadEventsFromDb();
    const saved = await loadSavedFromDb();
    console.log("Loaded events and saved data.");

    if (
      reminderTime &&
      events
        ?.sort(
          (a, b) =>
            new Date(b.changed || b.created) -
            new Date(a.changed || a.created)
        )
        ?.filter((e) => saved.includes(e?.id))?.length > 0
    ) {
      const reminderInMilliseconds = parseReminderTime(reminderTime);

      events
        ?.sort(
          (a, b) =>
            new Date(b.changed || b.created) -
            new Date(a.changed || a.created)
        )
        ?.filter((e) => saved.includes(e?.id))
        ?.forEach(async (event) => {
          let eventStartTime = parseISO(event?.start?.local);
          const currentTime = new Date();

          eventStartTime = subMonths(eventStartTime, 1);

          const timeUntilEvent = differenceInMilliseconds(
            eventStartTime,
            currentTime
          );

          if (
            timeUntilEvent > 0 &&
            timeUntilEvent <= reminderInMilliseconds &&
            event.eventNotified !== true
          ) {
            await sendNotification(event);
            await markAsNotified(event.id);
          }
        });
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error("Background task error:", error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Parse reminder time function
const parseReminderTime = (reminderTime) => {
  const timeUnits = {
    minute: 60 * 1000,
    minutes: 60 * 1000,
    hour: 60 * 60 * 1000,
    hours: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
  };

  const [value, unit] = reminderTime.split(" ");
  return parseInt(value) * timeUnits[unit] || 0;
};

// Function to send notification
const sendNotification = async (item) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Event Reminder",
      body: `Your event "${item.name.text}" is coming up soon!`,
      data: { eventId: item.id },
    },
    trigger: { seconds: 1 },
  });
};

// Register the background task
export const registerBackgroundTask = async () => {
  try {
    const status = await BackgroundFetch.getStatusAsync();
    if (
      status === BackgroundFetch.BackgroundFetchStatus.Restricted ||
      status === BackgroundFetch.BackgroundFetchStatus.Denied
    ) {
      console.log("Background fetch is restricted or denied.");
      return;
    }

    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 5,
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log("Background task registered.");
  } catch (error) {
    console.error("Failed to register background task:", error);
  }
};