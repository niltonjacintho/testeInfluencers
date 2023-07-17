import { Express, Request, Response } from "express";
import { InfluencersUseCase } from './../use-cases/influenciador.usecase'

function routes(app: Express) {
    const infUseCase = new InfluencersUseCase();
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
        const result = await infUseCase.getByName(req.params.nome);
        res.status(result.status).json(result.json);
    });

    /**
    * @openapi
    *  /influencer/listbychannel:
    *  paths:
    *   Influencers:
    *  post:
    *     tags:
    *       - influencer
    *     description: Adiciona um voto ao influenciador
    *     parameters:
    *        - name: id
    *          in: body
    *          description: Objeto Influenciador
    *          schema:
    *            type: integer
    *     responses:
    *         200:
    *         description: App em execução
    */
    app.post("/influencer/votar/:id", async (req: Request, res: Response) => {
        const result = await infUseCase.votar(1, parseInt(req.params.id));
        res.status(result.status).json(result.json);
    });

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
    app.post('/influencer', async (req, res) => {
        const result = await infUseCase.novo(req.body);
        res.status(result.status).json(result.json);
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
    app.get('/influencer', async (req, res) => {
        const result = await infUseCase.getByName('');
        res.status(result.status).json(result.json);
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
    app.get('/influencer/:id', async (req, res) => {
        const result = await infUseCase.getById(parseInt(req.params.id));
        res.status(result.status).json(result.json);
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
    app.put('/influencer', async (req, res) => {
        console.log('TENTANDO SALVAR')
        const result = await infUseCase.update(req.body);
        res.status(result.status).json(result.json);
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
    app.delete('/influencer/:id', async (req, res) => {
        const result = await infUseCase.delete(parseInt(req.params.id));
        res.status(result.status).json(result.json);
    });

    /**
  * @openapi
  *  /influencer/reset:
  *  paths:
  *   Influencers:
  *  delete:
  *     tags:
  *       - influencer
  *     description: Exclui um influenciador
  *     responses:
  *         200:
  *           description: 
  *               Registro excluido
  *         400:
  *           description: URL not found - Provavelmente a API esta fora do ar
  */
    app.post('/influencer/reset', async (req, res) => {
        console.log('i am in reset data');
        const result = await infUseCase.resetData();
        res.status(result.status).json(result.json);
    });

    /**
    * @openapi
    *  /influencer/reset:
    *  paths:
    *   Influencers:
    *  delete:
    *     tags:
    *       - influencer
    *     description: Exclui um influenciador
    *     responses:
    *         200:
    *           description: 
    *               Registro excluido
    *         400:
    *           description: URL not found - Provavelmente a API esta fora do ar
    */
    app.post('/influencer/randomVote/:qtd', async (req, res) => {
        const result = await infUseCase.randomVoter(parseInt(req.params.qtd));
        res.status(result.status).json(result.json);
    });

    /**
    * @openapi
    *  /influencer/top10:
    *  paths:
    *   Influencers:
    *  get:
    *     tags:
    *       - influencer
    *     description: Gera o top 10 para o grid
    *     responses:
    *         200:
    *           description: 
    *               Registro excluido
    *         400:
    *           description: URL not found - Provavelmente a API esta fora do ar
    */
    app.get('/influencer/top10', async (req, res) => {
        const result = await infUseCase.top10();
        res.status(result.status).json(result.json);
    });

    /**
    * @openapi
    *  /influencer/top10Graph:
    *  paths:
    *   Influencers:
    *  get:
    *     tags:
    *       - influencer
    *     description: Gerar o top 10 no formato dos gráficos
    *     responses:
    *         200:
    *           description: 
    *               Registro excluido
    *         400:
    *           description: URL not found - Provavelmente a API esta fora do ar
    */
    app.get('/influencer/top10Graph', async (req, res) => {
        const result = await infUseCase.top10Graph();
        res.status(result.status).json(result.json);
    });

}
export default routes;