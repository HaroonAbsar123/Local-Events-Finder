import * as SQLite from "expo-sqlite";

const dbPromise = SQLite.openDatabaseAsync("events.db");

export const createEventsTable = async () => {
  const db = await dbPromise;
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY NOT NULL,
      fullObject TEXT
    );
  `);
};

export const saveEventsToDb = async (events) => {
  const db = await dbPromise;
  await db.runAsync("DELETE FROM events;");
  const insertPromises = events.map((event) =>
    db.runAsync("INSERT INTO events (id, fullObject) VALUES (?, ?);", [
      event.id,
      JSON.stringify(event),
    ])
  );
  await Promise.all(insertPromises);
};

export const loadEventsFromDb = async () => {
  const db = await dbPromise;
  const eventsFromDb = await db.getAllAsync("SELECT * FROM events;");
  const events = eventsFromDb.map((event) => ({
    ...JSON.parse(event.fullObject),
    id: event.id,
  }));
  console.log("Events", events?.length)
  return events;
};
