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

  const existingEventsFromDb = await db.getAllAsync("SELECT id FROM events;");
  const existingEventIds = existingEventsFromDb.map((event) => event.id);

  const incomingEventIds = events.map((event) => event.id);

  const idsToDelete = existingEventIds.filter(
    (id) => !incomingEventIds.includes(id)
  );
  if (idsToDelete.length > 0) {
    const deletePromises = idsToDelete.map((id) =>
      db.runAsync("DELETE FROM events WHERE id = ?;", [id])
    );
    await Promise.all(deletePromises);
  }

  const insertPromises = events.map((event) =>
    db.runAsync(
      "INSERT OR IGNORE INTO events (id, fullObject) VALUES (?, ?);",
      [event.id, JSON.stringify(event)]
    )
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
  console.log("Events", events?.filter((e) => e?.eventNotified === true)?.length)
  return events;
};


export const markAsNotified = async (id) => {
  try{
  const db = await dbPromise;

  const eventFromDb = await db.getFirstAsync("SELECT fullObject FROM events WHERE id = ?;", [id]);

  if (eventFromDb) {
    const event = JSON.parse(eventFromDb.fullObject);

    if (!event.eventNotified) {
      event.eventNotified = true;

      await db.runAsync(
        "UPDATE events SET fullObject = ? WHERE id = ?;",
        [JSON.stringify(event), id]
      );
    } else {
      console.log("Event has already been notified.");
    }
  } else {
    console.log("Event not found.");
  }
} catch(e){
  console.error("Mark As Notified Error", e)
}
};


export const resetEventNotifications = async () => {
  try {
    const db = await dbPromise;

    const eventsFromDb = await db.getAllAsync("SELECT id, fullObject FROM events;");

    const resetPromises = eventsFromDb.map(async (eventFromDb) => {
      const event = JSON.parse(eventFromDb.fullObject);

      if (event.eventNotified) {
        event.eventNotified = false;

        await db.runAsync(
          "UPDATE events SET fullObject = ? WHERE id = ?;",
          [JSON.stringify(event), eventFromDb.id]
        );
      }
    });

    await Promise.all(resetPromises);

    console.log("All event notifications have been reset.");
  } catch (e) {
    console.error("Reset Event Notifications Error", e);
  }
};




// export const saveEventsToDb = async (events) => {
//   const db = await dbPromise;
//   await db.runAsync("DELETE FROM events;");
//   const insertPromises = events.map((event) =>
//     db.runAsync("INSERT INTO events (id, fullObject) VALUES (?, ?);", [
//       event.id,
//       JSON.stringify(event),
//     ])
//   );
//   await Promise.all(insertPromises);
// };