import { getRepository, Like } from 'typeorm';
import { Influenciador } from '../entities/Influenciador.entity';
import { faker } from '@faker-js/faker';
import log from "../utils/logger";

export class InfluencersUseCase {

    ufs: any[] = [
        {
            "nome": "none",
            "sigla": "XX"
        },
        {
            "nome": "Acre",
            "sigla": "AC"
        },
        {
            "nome": "Alagoas",
            "sigla": "AL"
        },
        {
            "nome": "Amapá",
            "sigla": "AP"
        },
        {
            "nome": "Amazonas",
            "sigla": "AM"
        },
        {
            "nome": "Bahia",
            "sigla": "BA"
        },
        {
            "nome": "Ceará",
            "sigla": "CE"
        },
        {
            "nome": "Distrito Federal",
            "sigla": "DF"
        },
        {
            "nome": "Espírito Santo",
            "sigla": "ES"
        },
        {
            "nome": "Goiás",
            "sigla": "GO"
        },
        {
            "nome": "Maranhão",
            "sigla": "MA"
        },
        {
            "nome": "Mato Grosso",
            "sigla": "MT"
        },
        {
            "nome": "Mato Grosso do Sul",
            "sigla": "MS"
        },
        {
            "nome": "Minas Gerais",
            "sigla": "MG"
        },
        {
            "nome": "Pará",
            "sigla": "PA"
        },
        {
            "nome": "Paraíba",
            "sigla": "PB"
        },
        {
            "nome": "Paraná",
            "sigla": "PR"
        },
        {
            "nome": "Pernambuco",
            "sigla": "PE"
        },
        {
            "nome": "Piauí",
            "sigla": "PI"
        },
        {
            "nome": "Rio de Janeiro",
            "sigla": "RJ"
        },
        {
            "nome": "Rio Grande do Norte",
            "sigla": "RN"
        },
        {
            "nome": "Rio Grande do Sul",
            "sigla": "RS"
        },
        {
            "nome": "Santa Catarina",
            "sigla": "SC"
        },
        {
            "nome": "São Paulo",
            "sigla": "SP"
        },
        {
            "nome": "Sergipe",
            "sigla": "SE"
        },
        {
            "nome": "Tocantins",
            "sigla": "TO"
        }
    ];



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
        log.info('ID em UPDATE', id, body)
        try {
            const influenciador = await getRepository(Influenciador).findOneOrFail({ where: { id: id } });
            getRepository(Influenciador).merge(influenciador, body);
            const updatedInfluenciador = await getRepository(Influenciador).save(
                influenciador
            );
            return ({ status: 200, json: updatedInfluenciador });
        } catch (err: any) {
            return ({ status: 500, json: { message: err.message } });
        }
    }

    async delete(id: number) {
        try {
            const influenciador = await getRepository(Influenciador).createQueryBuilder('influenciador').delete().where("id = :id", { id: id })
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

    async resetData(qtd: number = 100, trunc: boolean = false) {
        log.info('Truncate ' + trunc)
        try {
            //            var influenciadores = await getRepository(Influenciador)
            if (trunc) {
                log.info('Truncate ' + trunc)
                await getRepository(Influenciador)
                    .query("Truncate table influenciador;ALTER SEQUENCE influenciadores_id_seq RESTART WITH 1;");
            }
            for (let index = 0; index < qtd; index++) {
                const body = {
                    "nome": faker.person.firstName(),
                    "fullname": faker.person.fullName(),
                    "nick": faker.internet.userName(),
                    "senha": faker.internet.password(),
                    "telefone": faker.phone.number(),
                    "email": faker.internet.email(),
                    "instagram": faker.lorem.word(),
                    "youtube": faker.internet.url(),
                    "facebook": faker.lorem.word(),
                    "outros": faker.lorem.word(),
                    "uf": this.ufs[Math.floor(Math.random() * this.ufs.length)].sigla,
                    "votos": 0,
                    "last_post_date": "1/4/2022"
                }
                await getRepository(Influenciador).save(body);
            }
            return ({ status: 200, json: { message: 'Processo finalizado com êxito' } });
        } catch (err: any) {
            return ({ status: 500, json: { message: err.message } });
        }
    }

    async top10(qtd: number = 10) {
        console.log('number ===>', qtd)
        try {
            let sql = ' select NOME, count(votos), i.votos , (select count(votos) from influenciador i2 where i2.votos = i.votos ) total2 from influenciador i  ';
            sql += ' group by i.nome, i.votos ';
            sql += ' order by i.votos desc, total2 desc ';
            sql += ' limit 10 ' //+ qtd ? qtd.toString() : '10';
            console.log('SQL ===> ', sql);
            const influenciador = await getRepository(Influenciador)
                .query(sql);
            return ({ status: 200, json: influenciador, message: '' });
        } catch (err: any) {
            return ({ status: 500, json: { message: err.message } });
        }
    }

    async top10Graph(qtd: number = 10) {
        try {
            let sql = 'select r.total, count(total) from ( ';
            sql += 'select NOME, SUM(votos) total from influenciador i ';
            sql += 'group by i.nome) as r ';
            sql += 'group by r.total ';
            sql += 'order by count(total) ';
            sql += 'limit ' + qtd.toString();
            const influenciador = await getRepository(Influenciador)
                .query(sql);
            return ({ status: 200, json: influenciador, message: '' });
        } catch (err: any) {
            return ({ status: 500, json: { message: err.message } });
        }
    }


    async graphUf() {
        try {
            let sql = ' select count(uf) total_uf, sum(votos) votos, uf from influenciador i  ';
            sql += ' group by uf ';
            sql += ' order by uf';
            const influenciador = await getRepository(Influenciador)
                .query(sql);
            return ({ status: 200, json: influenciador, message: '' });
        } catch (err: any) {
            return ({ status: 500, json: { message: err.message } });
        }
    }

    async randomVoter(qtd: number) {
        try {
            const influenciador = await getRepository(Influenciador)
                .query('Select randomvote(' + qtd.toString() + ')')
            return ({ status: 200, json: 'Votos realizados', message: '' });
        } catch (err: any) {
            return ({ status: 500, json: { message: err.message } });
        }
    }



}