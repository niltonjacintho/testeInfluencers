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
exports.InfluencersUseCase = void 0;
const typeorm_1 = require("typeorm");
const Influenciador_entity_1 = require("../entities/Influenciador.entity");
const faker_1 = require("@faker-js/faker");
class InfluencersUseCase {
    getByName(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const influenciadores = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador)
                    .createQueryBuilder("influenciador")
                    .where("upper(influenciador.nome) like :nome", { nome: `%${nome.toUpperCase()}%` })
                    .orWhere("upper(influenciador.nick) like :nome", { nome: `%${nome.toUpperCase()}%` })
                    .getMany();
                return ({ status: 200, json: influenciadores, message: '' });
            }
            catch (err) {
                return ({ status: 500, json: { message: err.messagenciadores } });
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const influenciadores = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador)
                    .createQueryBuilder("influenciador")
                    .where("influenciador.id = :id", { id: id })
                    .getOne();
                return ({ status: 200, json: influenciadores });
            }
            catch (err) {
                return ({ status: 500, json: { message: err.messagenciadores } });
            }
        });
    }
    votar(voto, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const influenciador = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador).findOneOrFail({ where: { id: id } });
                influenciador.votos += voto;
                const updatedInfluenciador = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador).save(influenciador);
                return ({ status: 200, json: updatedInfluenciador, message: '' });
            }
            catch (err) {
                return ({ status: 500, json: { message: err.message } });
            }
        });
    }
    novo(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const influenciador = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador).save(body);
                return ({ status: 200, json: influenciador, message: '' });
            }
            catch (err) {
                return ({ status: 500, json: { message: err.message } });
            }
        });
    }
    update(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(body.id);
            console.log('ID em UPDATE', id, body);
            try {
                const influenciador = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador).findOneOrFail({ where: { id: id } });
                (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador).merge(influenciador, body);
                const updatedInfluenciador = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador).save(influenciador);
                return ({ status: 200, json: updatedInfluenciador });
            }
            catch (err) {
                return ({ status: 500, json: { message: err.message } });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const influenciador = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador).createQueryBuilder('influenciador').delete().where("id = :id", { id: id })
                    .execute();
                if (influenciador.affected > 0) {
                    return ({ status: 201, json: { message: "Influenciador excluído com sucesso!" } });
                }
                else {
                    return ({ status: 201, json: { message: "Não encontrei influenciador com o id solicitado" } });
                }
            }
            catch (err) {
                return ({ status: 201, json: { message: err.message } });
            }
        });
    }
    resetData(qtd = 100) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const influenciadores = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador)
                    .query("Truncate table influenciador;ALTER SEQUENCE influenciadores_id_seq RESTART WITH 1;");
                const lista = this.getByName('');
                //  const influenciador = await getRepository(Influenciador).save(body);
                for (let index = 0; index < qtd; index++) {
                    const body = {
                        "nome": faker_1.faker.person.firstName(),
                        "fullname": faker_1.faker.person.fullName(),
                        "nick": faker_1.faker.internet.userName(),
                        "senha": faker_1.faker.internet.password(),
                        "telefone": faker_1.faker.phone.number(),
                        "email": faker_1.faker.internet.email(),
                        "instagram": faker_1.faker.lorem.word(),
                        "youtube": faker_1.faker.internet.url(),
                        "facebook": faker_1.faker.lorem.word(),
                        "outros": faker_1.faker.lorem.word(),
                        "votos": 0,
                        "last_post_date": "1/4/2022"
                    };
                    yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador).save(body);
                }
                return ({ status: 200, json: influenciadores });
            }
            catch (err) {
                return ({ status: 500, json: { message: err.message } });
            }
        });
    }
    RandomVoter(qtd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const influenciador = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador).findOneOrFail({ where: { id: id } });
                influenciador.votos += voto;
                const updatedInfluenciador = yield (0, typeorm_1.getRepository)(Influenciador_entity_1.Influenciador).save(influenciador);
                return ({ status: 200, json: updatedInfluenciador, message: '' });
            }
            catch (err) {
                return ({ status: 500, json: { message: err.message } });
            }
        });
    }
}
exports.InfluencersUseCase = InfluencersUseCase;
