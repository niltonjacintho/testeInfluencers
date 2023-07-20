import express from "express";
import routes from "./routes/main.router";
import swaggerDocs from "./utils/swagger";
import dotenv from "dotenv";
dotenv.config();
import logger from "./utils/logger";
import { createConnection } from "typeorm";

// import {} from "./entities/"
const cors = require('cors');
const port = Number(process.env.PORT) || 8000;

const app = express();

const connection = createConnection({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(String(process.env.DATABASE_PORT)),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
});

app.use(express.json());

app.use(cors({ origin: '*' }));

app.listen(port, async () => {
  logger.info(`App is running at <<<<< http://localhost:${port} >>>>>>`);
  routes(app);
  swaggerDocs(app, port);
});

function cors1(arg0: { origin: string; }): any {
  throw new Error("Function not implemented." + arg0);
}

