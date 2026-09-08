import * as SQLite from "expo-sqlite";

export const getDb = async () => await SQLite.openDatabaseAsync("app.db");
