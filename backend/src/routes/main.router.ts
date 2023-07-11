import { Express, Request, Response } from "express";
import { getRepository } from 'typeorm';
import { Influenciador } from './../entities/Influenciador';

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

    /**
        * @openapi
        * /influencer/list:
        *  get:
        *     tags:
        *     - influencer
        *     description: Verifica o status da API
        *     responses:
        *       200:
        *         description: App em execução
        */
    app.get("/influencer/list", (req: Request, res: Response) => res.sendStatus(200));

    /**
        * @openapi
        * /influencer/listByName:
        *  get:
        *     tags:
        *     - influencer
        *     description: Verifica o status da API
        *     parameters:
        *       nome:
        *           nome ou parte do mesmo para pesquisa
        *     responses:
        *       200:
        *         description: Todos os influencer que possuam este nome ou parte dele
        */
    app.get("/influencer/listByName", (req: Request, res: Response) => res.sendStatus(200));

    /**
        * @openapi
        *  /influencer/listbychannel:
        *  paths:
        *   Influencers:
        *  get:
        *     tags:
        *       - influencer
        *     description: Verifica o status da API
        *     responses:
        *         200:
        *         description: App em execução
        */
    app.get("/influencer/listbychannel", (req: Request, res: Response) => res.sendStatus(200));

    // Create a new influenciador
    app.post('/influenciadores', async (req, res) => {
        try {
            const influenciador = await getRepository(Influenciador).save(req.body);
            res.status(201).json(influenciador);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    });

    // Get all influenciadores
    app.get('/influenciadores', async (req, res) => {
        try {
            const influenciadores = await getRepository(Influenciador).find();
            res.json(influenciadores);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    });

    // Get a specific influenciador
    app.get('/influenciadores/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const influenciador = await getRepository(Influenciador).findOneOrFail({ where: { id: id } });
            res.json(influenciador);
        } catch (err: any) {
            res.status(404).json({ message: err.message });
        }
    });

    // Update an influenciador
    app.patch('/influenciadores/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const influenciador = await getRepository(Influenciador).findOneOrFail({ where: { id: id } });
            getRepository(Influenciador).merge(influenciador, req.body);
            const updatedInfluenciador = await getRepository(Influenciador).save(
                influenciador
            );
            res.json(updatedInfluenciador);
        } catch (err: any) {
            res.status(404).json({ message: err.message });
        }
    });

}
export default routes;