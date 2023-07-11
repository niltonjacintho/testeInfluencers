import { Express, Request, Response } from "express";
import { getRepository, Like } from 'typeorm';
import { Influenciador } from '../entities/Influenciador.entity';
import log from "./../utils/logger";

function routes(app: Express) {
    /**
    * @openapi
    * /healthcheck:
    *  get:
    *     tags:
    *       - Healthcheck
    *     description: 
    *       Verifica o status da API
    *     responses:
    *       '200':
    *          App em execução
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
    app.get("/influencer/list/:nome", async (req: Request, res: Response) => {
        try {
            const influenciadores = await getRepository(Influenciador)
                .createQueryBuilder("influenciador")
                .where("upper(influenciador.nome) like :nome", { nome: `'%${req.params.nome.toUpperCase()}%'` })
                .getMany();
            res.status(201).json(influenciadores);
        } catch (err: any) {
            log.info('erro');
            res.status(500).json({ message: err.message });
        }
    });

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

    /**
    * @openapi
    *  /influencer:
    *  paths:
    *   Influencers:
    *  post:
    *     tags:
    *       - influencer
    *     description: Incluir novo influenciador
    *     parameters:
    *        - name: id
    *          in: body
    *          description: Objeto Influenciador
    *          schema:
    *            type: $ref './../entities/influenciador.ts'
    *     responses:
    *         200:
    *           description: App em execução
    *         400:
    *           description: URL not found - Provavelmente a API esta fora do ar
    */
    app.post('/influenciadores', async (req, res) => {
        try {
            const influenciador = await getRepository(Influenciador).save(req.body);
            res.status(201).json(influenciador);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    });

    /**
    * @openapi
    *  /influencer:
    *  paths:
    *   Influencers:
    *  get:
    *     tags:
    *       - influencer
    *     description: recuperar influenciador
    *     responses:
    *         200:
    *           description: App em execução
    *         500:
    *           description: Erro - ver mensagem de retorno
    */
    app.get('/influenciadores', async (req, res) => {
        try {
            const influenciadores = await getRepository(Influenciador).find();
            res.json(influenciadores);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    });

    /**
    * @openapi
    *  /influencer:
    *  paths:
    *   Influencers:
    *  get:
    *     tags:
    *       - influencer
    *     description: Recuperar influencer pelo ID
    *     parameters:
    *        - name: id
    *          in: query
    *          description: Limits the number of items on a page
    *          schema:
    *            type: integer
    *     responses:
    *         200:
    *           description: 
    *               App em execução
    *         400:
    *           description: URL not found - Provavelmente a API esta fora do ar
    */
    app.get('/influenciadores/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const influenciador = await getRepository(Influenciador).findOneOrFail({ where: { id: id } });
            res.json(influenciador);
        } catch (err: any) {
            res.status(404).json({ message: err.message });
        }
    });



    /**
    * @openapi
    *  /influencer:
    *  paths:
    *   Influencers:
    *  patch:
    *     tags:
    *       - influencer
    *     description: Atualiza um influenciador
    *     parameters:
    *        - name: id
    *          in: query
    *          description: Influenciador
    *          schema:
    *            type: integer
    *     responses:
    *         200:
    *           description: 
    *               Registro atualizado
    *         400:
    *           description: URL not found - Provavelmente a API esta fora do ar
    */
    app.patch('/influenciadores', async (req, res) => {
        const id = parseInt(req.body.id);
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

    /**
    * @openapi
    *  /influencer:
    *  paths:
    *   Influencers:
    *  delete:
    *     tags:
    *       - influencer
    *     description: Exclui um influenciador
    *     parameters:
    *        - name: id
    *          in: query
    *          description: Influenciador
    *          schema:
    *            type: integer
    *     responses:
    *         200:
    *           description: 
    *               Registro excluido
    *         400:
    *           description: URL not found - Provavelmente a API esta fora do ar
    */
    app.delete('/influenciadores/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const influenciador = await getRepository(Influenciador).createQueryBuilder('influenciador').delete().where("id = :id", { id: 1 })
                .execute();
            log.info(influenciador.affected !== 0);

            if (influenciador.affected! > 0) {
                res.status(201).json({ message: "Influenciador excluído com sucesso!" });
            } else {
                res.status(403).json("Não encontrei influenciador com o id solicitado");
            }

        } catch (err: any) {
            res.status(404).json({ message: err.message });
        }
    });

}
export default routes;