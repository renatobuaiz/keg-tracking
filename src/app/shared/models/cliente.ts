export interface Cliente {
    // campo opcional ? para os registros que ainda não existem e que será gerado pelo backend
    id?: number;
    nomeFantasia: string;
    posicaoGPS: {
        latitude: number,
        longitude: number
    }
}
