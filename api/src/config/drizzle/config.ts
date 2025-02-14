import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { databaseConfig } from "../../database/config";

const client = new Pool({
  connectionString: databaseConfig.url
});

export const db = drizzle({ client });

/** Configuração básica sem pool de conexões */
// import { drizzle } from "drizzle-orm/node-postgres";
// import pg from "pg";
// import { databaseConfig } from "./database.config";
// 
// const client = pg(databaseConfig.url);
// export const db = drizzle(client);
/** Configuração básica sem pool de conexões */