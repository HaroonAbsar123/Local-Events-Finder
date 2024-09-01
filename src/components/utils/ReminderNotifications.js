import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { loadEventsFromDb, markAsNotified } from "../../sqlite/SyncEvents";
import { useEffect, useState } from "react";
import { parseISO, differenceInMilliseconds, subMonths } from "date-fns";
import { loadSavedFromDb } from "../../sqlite/SyncSaved";

export default function ReminderNotifications() {
  const [reminderTime, setReminderTime] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const thisReminderTime = await AsyncStorage.getItem("reminderTime");
      const thisEvents = await loadEventsFromDb();
      const thisSaved = await loadSavedFromDb();
      setReminderTime(thisReminderTime);
      const filteredEvents = thisEvents.sort(
        (a, b) =>
          new Date(b.changed || b.created) - new Date(a.changed || a.created)
      )?.filter((e) => thisSaved.includes(e?.id))
      console.log("filteredEvents", filteredEvents?.length)
      setEvents(filteredEvents);
    };

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (reminderTime && events.length > 0) {
      const reminderInMilliseconds = parseReminderTime(reminderTime);

      events.forEach(async (event) => {
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
  }, [reminderTime, events]);

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

  return null;
}
