"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const influenciador_usecase_1 = require("./../use-cases/influenciador.usecase");
function routes(app) {
    const infUseCase = new influenciador_usecase_1.InfluencersUseCase();
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
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
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
    app.get("/influencer/list/:nome", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const result = yield infUseCase.getByName(req.params.nome);
        res.status(result.status).json(result.json);
    }));
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
    app.post("/influencer/votar/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const result = yield infUseCase.votar(1, parseInt(req.params.id));
        res.status(result.status).json(result.json);
    }));
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
    app.post('/influencer', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const result = yield infUseCase.novo(req.body);
        res.status(result.status).json(result.json);
    }));
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
    app.get('/influencer', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const result = yield infUseCase.getByName('');
        res.status(result.status).json(result.json);
    }));
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
    app.get('/influencer/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const result = yield infUseCase.getById(parseInt(req.params.id));
        res.status(result.status).json(result.json);
    }));
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
    app.put('/influencer', (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log('TENTANDO SALVAR');
        const result = yield infUseCase.update(req.body);
        res.status(result.status).json(result.json);
    }));
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
    app.delete('/influencer/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const result = yield infUseCase.delete(parseInt(req.params.id));
        res.status(result.status).json(result.json);
    }));
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
    app.post('/influencer/reset', (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log('i am in reset data');
        const result = yield infUseCase.resetData();
        res.status(result.status).json(result.json);
    }));
}
exports.default = routes;
