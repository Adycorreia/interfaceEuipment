
export enum StatusEnum {
    CARTA = 'CARTA',
    LIVRETE = 'LIVRETE',
    CAP = 'CAP'
}

export interface Documents {
iddoc: Number;
matricula: string;
condutor: string;
n_carta: string;
n_cap: string;
proprietario: string;
motivo: string;
n_oficio: string;
destino: string;
data_apreensao: string;
data_entrega: string;
tipodoc: string;
v_apreendido: string;
obs: string;

}


