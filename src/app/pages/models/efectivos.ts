import { LocalData } from "ng2-completer";

export interface Efectivos {
    idagente: number;

    id_pn: number;

    nome: string;

    apelido: string;

    data_nasc: LocalData;

    sexo: string;

    filiacao: string;

    idade: number;

    cni: string;

    nif: number;

    posto: string;

    morada: string;

    funcao: string;

    contacto: string;

    email: string;

    creation: Date;
    
    update: Date;

    obs:string;

    fotografia: string;

    n_arma: number;

    marca: string;

    modelo: string;

    n_carregador: number;

    n_municoes: number;

    estado_arma: string;
    
    data_inspeArma: Date;


}



