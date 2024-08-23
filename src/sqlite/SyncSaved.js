import * as SQLite from "expo-sqlite";

const dbPromise = SQLite.openDatabaseAsync("saved.db");

export const createSavedTable = async () => {
  const db = await dbPromise;
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS saved (
      id TEXT PRIMARY KEY NOT NULL
    );
  `);
};

export const saveIdsToDb = async (savedIds) => {
  const db = await dbPromise;

  const existingIds = await loadSavedFromDb();

  const newIds = savedIds.filter((id) => !existingIds.includes(id));
  const removeIds = existingIds.filter((id) => !savedIds.includes(id));

  const insertPromises = newIds.map((id) =>
    db.runAsync("INSERT INTO saved (id) VALUES (?);", [id])
  );

  const removePromises = removeIds.map((id) =>
    db.runAsync("DELETE FROM saved WHERE id = ?;", [id])
  );

  await Promise.all([...insertPromises, ...removePromises]);
};


export const loadSavedFromDb = async () => {
  const db = await dbPromise;
  const savedFromDb = await db.getAllAsync("SELECT * FROM saved;");
  const saved = savedFromDb.map((saved) => saved.id);
  console.log("saved", saved?.length)
  return saved;
};

export const clearSavedTable = async () => {
  const db = await dbPromise;
  await db.runAsync("DELETE FROM saved;");
};
