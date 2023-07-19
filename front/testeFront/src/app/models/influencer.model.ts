export interface InfluencerInterface {
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
    uf: string | null;
}


export const newInfluencerInterface = ((): InfluencerInterface => {
    return {
        id: 0,
        nome: '',
        fullname: '',
        nick: '',
        senha: '',
        telefone: '',
        email: '',
        instagram: '',
        youtube: '',
        facebook: '',
        outros: '',
        votos: 0,
        uf: '',
    }
})
