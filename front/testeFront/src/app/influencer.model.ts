export class InfluencerModel {
    id: number;
    nome: string | null;
    fullname: string | null;
    nick: string | null;
    senha: string | null;
    telefone: string | null;
    email: string | null;
    instagram: string | null;
    youtube: string | null;
    facebook: string | null;
    outros: string | null;
    votos: number;

    constructor(data: {
        id: number | 0;
        nome: string | null;
        fullname: string | null;
        nick: string | null;
        senha: string | null;
        telefone: string | null;
        email: string | null;
        instagram: string | null;
        youtube: string | null;
        facebook: string | null;
        outros: string | null;
        votos: number | 0;
    }) {
        this.id = data.id;
        this.nome = data.nome;
        this.fullname = data.fullname;
        this.nick = data.nick;
        this.senha = data.senha;
        this.telefone = data.telefone;
        this.email = data.email;
        this.instagram = data.instagram;
        this.youtube = data.youtube;
        this.facebook = data.facebook;
        this.outros = data.outros;
        this.votos = data.votos;
    }

    toJSON(): any {
        return {
            id: this.id,
            nome: this.nome,
            fullname: this.fullname,
            nick: this.nick,
            senha: this.senha,
            telefone: this.telefone,
            email: this.email,
            instagram: this.instagram,
            youtube: this.youtube,
            facebook: this.facebook,
            outros: this.outros,
            votos: this.votos,
        };
    }

    static fromJson(json: any): InfluencerModel {
        return new InfluencerModel({
            id: json.id,
            nome: json.nome,
            fullname: json.fullname,
            nick: json.nick,
            senha: json.senha,
            telefone: json.telefone,
            email: json.email,
            instagram: json.instagram,
            youtube: json.youtube,
            facebook: json.facebook,
            outros: json.outros,
            votos: json.votos,
        });
    }
}
