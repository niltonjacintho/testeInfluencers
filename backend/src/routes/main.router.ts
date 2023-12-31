import { Express, Request, Response } from "express";
import log from "../utils/logger";
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
  *  /influencer/reset/dados/:truncate:
  *  paths:
  *   Influencers:
  *  delete:
  *     tags:
  *       - influencer
  *     description: Reinicializa a base de dados
  *     responses:
  *         200:
  *           description: 
  *               base de dados re-inicializada
  *         400:
  *           description: URL not found - Provavelmente a API esta fora do ar
  */
    app.post('/influencer/reset/dados/:truncate', async (req, res) => {
        console.log('PARAMETROS ==> ', req.params.truncate.toLowerCase() === 'true', req.params.truncate.toLowerCase())
        const result = await infUseCase.resetData(100, req.params.truncate.toLowerCase() === 'true');
        res.status(result.status).json(result.json);
    });

    /**
    * @openapi
    *  /influencer/vote/random/:qtd:
    *  paths:
    *   Influencers:
    *  post:
    *     tags:
    *       - influencer
    *     description: Gera votos randomicos
    *     responses:
    *         200:
    *           description: 
    *               Votos realizados
    *         400:
    *           description: URL not found - Provavelmente a API esta fora do ar
    */
    app.post('/influencer/vote/random/:qtd', async (req, res) => {
        const result = await infUseCase.randomVoter(parseInt(req.params.qtd));
        res.status(result.status).json(result.json);
    });

    /**
    * @openapi
    *  /influencer/topdez/list:
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
    app.get('/influencer/topdez/list', async (req, res) => {
        console.log('ENTROU-----------------------------------', req.params)
        const result = await infUseCase.top10();
        res.status(result.status).json(result.json);
    });

    /**
    * @openapi
    *  /influencer/topdezGraph/list:
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
    app.get('/influencer/topdezGraph/list', async (req, res) => {
        const result = await infUseCase.top10Graph();
        res.status(result.status).json(result.json);
    });

    /**
    * @openapi
    *  /influencer/graph/uf:
    *  paths:
    *   Influencers:
    *  get:
    *     tags:
    *       - influencer
    *     description: Retorna os dados de analise por uf
    *     responses:
    *         200:
    *           description: 
    *               Dados retornados com êxito
    *         400:
    *           description: URL not found - Provavelmente a API esta fora do ar
    */
    app.get('/influencer/graph/uf', async (req, res) => {
        const result = await infUseCase.graphUf();
        res.status(result.status).json(result.json);
    });

}
export default routes;