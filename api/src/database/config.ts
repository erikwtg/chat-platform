import { config } from "dotenv";

config();

export const databaseConfig = {
  url: `${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` as string,
};

/** Configuração básica sem url dinamica */
// import { config } from "dotenv";
// config();
// 
// export const databaseConfig = {
//   url: process.env.DB_URL as string,
// };
/** Configuração básica sem url dinamica */