import { getRepository, Like } from 'typeorm';
import { Influenciador } from '../entities/Influenciador.entity';


export class InfluencersUseCase { // Or BaseUseCase<{ idMask: string}>
    async getByName(nome: string) {
        try {
            const influenciadores = await getRepository(Influenciador)
                .createQueryBuilder("influenciador")
                .where("upper(influenciador.nome) like :nome", { nome: `%${nome.toUpperCase()}%` })
                .orWhere("upper(influenciador.nick) like :nome", { nome: `%${nome.toUpperCase()}%` })
                .getMany();
            return ({ status: 200, json: influenciadores, message: '' });
        } catch (err: any) {
            return ({ status: 500, json: { message: err.messagenciadores } });
        }
    }

    async getById(id: number) {
        try {
            const influenciadores = await getRepository(Influenciador)
                .createQueryBuilder("influenciador")
                .where("influenciador.id = :id", { id: id })
                .getOne();
            return ({ status: 200, json: influenciadores });
        } catch (err: any) {
            return ({ status: 500, json: { message: err.messagenciadores } });
        }
    }

    async votar(voto: number, id: number) {
        try {
            const influenciador = await getRepository(Influenciador).findOneOrFail({ where: { id: id } });
            influenciador.votos += voto;
            const updatedInfluenciador = await getRepository(Influenciador).save(
                influenciador
            );
            return ({ status: 200, json: updatedInfluenciador, message: '' });
        } catch (err: any) {
            return ({ status: 500, json: { message: err.message } });
        }
    }

    async novo(body: any) {
        try {
            const influenciador = await getRepository(Influenciador).save(body);
            return ({ status: 200, json: influenciador, message: '' });
        } catch (err: any) {
            return ({ status: 500, json: { message: err.message } });
        }

    }

    async update(body: any) {
        const id = parseInt(body.id);
        try {
            const influenciador = await getRepository(Influenciador).findOneOrFail({ where: { id: id } });
            getRepository(Influenciador).merge(influenciador, body);
            const updatedInfluenciador = await getRepository(Influenciador).save(
                influenciador
            );
            return ({ status: 200, json: updatedInfluenciador });
        } catch (err: any) {
            return ({ status: 200, json: { message: err.message } });
        }
    }

    async delete(id: number) {
        try {
            const influenciador = await getRepository(Influenciador).createQueryBuilder('influenciador').delete().where("id = :id", { id: 1 })
                .execute();
            if (influenciador.affected! > 0) {
                return ({ status: 201, json: { message: "Influenciador excluído com sucesso!" } });
            } else {
                return ({ status: 201, json: { message: "Não encontrei influenciador com o id solicitado" } });
            }
        } catch (err: any) {
            return ({ status: 201, json: { message: err.message } });
        }
    }
}