import express from "express";
import routes from "./routes/main.router";
import swaggerDocs from "./utils/swagger";
import dotenv from "dotenv";
dotenv.config();
import logger from "./utils/logger";
import { createConnection } from "typeorm";
// import {} from "./entities/"

const port = Number(process.env.PORT) || 8000;

const app = express();

const connection = createConnection({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "postgres",
  database: "teste",
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
});

app.use(express.json());

app.listen(port, async () => {
  logger.info(`App is running at <<<<< http://localhost:${port} >>>>>>`);
  routes(app);
  swaggerDocs(app, port);
});
