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
  await db.runAsync("DELETE FROM saved;");
  const insertPromises = savedIds.map((id) =>
    db.runAsync("INSERT INTO saved (id) VALUES (?);", [id])
  );
  await Promise.all(insertPromises);
};

export const loadSavedFromDb = async () => {
  const db = await dbPromise;
  const savedFromDb = await db.getAllAsync("SELECT * FROM saved;");
  return savedFromDb.map((saved) => saved.id);
};
