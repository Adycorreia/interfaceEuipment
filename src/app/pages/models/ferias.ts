import { LocalData } from "ng2-completer";

export interface Ferias {

    idferia: number;

    data_inicio: LocalData;

    data_fim: LocalData;

    local_feria: string;

    entrega_arma: string;

    n_oficio: string;

    despacho: string;

    estado: string;

    pass_numero: string;

    user_despacho: string;

    id_agente: number;

    nome_efectivo: string;

    apelido_efectivo: string;

    creation: Date;
    
    update: Date;

    obs:string;


}



