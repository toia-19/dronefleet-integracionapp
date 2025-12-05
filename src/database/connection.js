require("reflect-metadata");
const { DataSource } = require("typeorm");
const Flight = require("./entities/Flight");

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DATABASE || "dronefleet",
  entities: [Flight],
  synchronize: true,
  logging: true,      
});

module.exports = AppDataSource;
