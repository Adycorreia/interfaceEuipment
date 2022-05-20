import { Params } from "@angular/router";

export enum StatusEnum {
    CARTA = 'CARTA',
    LIVRETE = 'LIVRETE',
    CAP = 'CAP'
}

export interface Documents {
id: number;
matricula: string;
condutor: string;
n_carta: string;
proprietario: string;
motivo: string;
n_oficio: string;
destino: string;
data_apreensao: string;
data_entrega: string;
tipodoc: StatusEnum;
v_apreendido: string;
obs: string;

}
