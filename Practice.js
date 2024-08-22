import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import * as SQLite from 'expo-sqlite';
import EventItem from "./EventItem";


export default function EventsList({ navigation }) {
  const [events, setEvents] = useState([]);



  useEffect(() => {

    async function createTable() {
      const db = await SQLite.openDatabaseAsync('events.db');
    
      // Create the table if it doesn't exist
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS events (
          id TEXT PRIMARY KEY NOT NULL
        );
      `);
    
      // Check if the 'fullObject' column exists
      const columns = await db.getAllAsync("PRAGMA table_info(events);");
      const columnNames = columns.map(column => column.name);
    
      if (!columnNames.includes('fullObject')) {
        await db.runAsync('ALTER TABLE events ADD COLUMN fullObject TEXT;');
      }
    }
    

    async function fetchEventsHandler() {
      try {
        const response = await fetch('https://www.eventbriteapi.com/v3/organizations/1466912144973/events?token=NBTMWUACKFEOM2VLR6IJ');
        const data = await response.json();

        const sortedEvents = data.events.sort((a, b) => {
          const dateA = new Date(a.changed || a.created);
          const dateB = new Date(b.changed || b.created);
          return dateB - dateA;
        });

        const db = await SQLite.openDatabaseAsync('events.db');

        await db.runAsync('DELETE FROM events;');

        for (const event of sortedEvents) {
          const eventInJSON = JSON.stringify(event)
          await db.runAsync(
            'INSERT INTO events (id, fullObject) VALUES (?, ?);',
            event.id, eventInJSON
          );
        }

        setEvents(sortedEvents);
      } catch (error) {
        console.error(error);
        loadEventsFromDb(); 
      }
    }

    async function loadEventsFromDb() {
      
      const db = await SQLite.openDatabaseAsync('events.db');

      const eventsFromDb = await db.getAllAsync('SELECT * FROM events;');

      const parsedEvents = eventsFromDb.map(event => ({
        ...JSON.parse(event.fullObject),
        id: event.id,
      }));

      console.log("eventsFromDb", parsedEvents)
      setEvents(parsedEvents);
    }

    const fetchEvents = async () => {
      const isOnline = await checkOnlineStatus();
      if (isOnline) {
        fetchEventsHandler();
      } else {
        loadEventsFromDb();
      }
    };

    createTable();
    fetchEvents();
  }, []);

  const checkOnlineStatus = async () => {
    try {
      const response = await fetch('https://www.google.com');
      return response.ok;
      // return false;
    } catch {
      return false;
    }
  };

  const styles = StyleSheet.create({
    container: {
      margin: 20,
      marginTop: 0,
      paddingBottom: 30,
    },
    itemContainer: {
      flex: 1,
      margin: 3,
    },
    singleItemContainer: {
      flex: 0.5,
      margin: 3,
    }
  });

  const renderItem = ({ item, index }) => {
    const isLastItemInRow = index === events.length - 1 && events.length % 2 !== 0;
    return (
      <View style={isLastItemInRow ? styles.singleItemContainer : styles.itemContainer}>
        <EventItem item={item} navigation={navigation} />
      </View>
    );
  };

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={1}
      contentContainerStyle={styles.container}
    />
  );
}
