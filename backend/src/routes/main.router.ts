import { Express, Request, Response } from "express";
// import express, { Application } from "express";
// import { exampleFunction } from "../controller/example";

function routes(app: Express) {
    /**
    * @openapi
    * /healthcheck:
    *  get:
    *     tags:
    *     - Healthcheck
    *     description: Verifica o status da API
    *     responses:
    *       200:
    *         description: App em execução
    */
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

}
export default routes;