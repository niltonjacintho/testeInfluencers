import express, { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import routes from "./routes/main.router";
import swaggerDocs from "./utils/swagger";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import mainRoutes from "./routes/main.router"
import exp from "constants";
import logger from "./utils/logger";

const port = Number(process.env.PORT) || 8000;

const app = express();

app.use(express.json());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use(bodyParser.json());

// app.use(mainRoutes);

app.listen(port, async () => {
  logger.info(`App is running at <<<<< http://localhost:${port} >>>>>>`);
  routes(app);
  swaggerDocs(app, port);
});
