export interface InfluencerInterface {
    id: number;
    nome: string | null;
    nomeCompleto: string | null;
    nick: string | null;
    senha: string | null;
    telefone: string | null;
    email: string | null;
    instagram: string | null;
    youtube: string | null;
    facebook: string | null;
    outros: string | null;
    votos: number;
}


export const newInfluencerInterface = (():InfluencerInterface => {
    return {
        id: 0,
        nome: '',
        nomeCompleto: '',
        nick: '',
        senha: '',
        telefone: '',
        email: '',
        instagram: '',
        youtube: '',
        facebook: '',
        outros: '',
        votos: 0,
    }
})
