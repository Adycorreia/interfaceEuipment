import { LocalData } from "ng2-completer";
import { Efectivos } from "./efectivos";

export interface Armamento {
    idarma: number;

    numero: number;

    marca: string;

    modelo: string;

    calibre: string;

    n_carregador: number;

    n_municoes: number;

    estado: string;

    fotografia: string;

    id_agente: number;

    nome_efectivo: string;

    apelido_efectivo: string;

    creation: Date;
    
    update: Date;

    obs:string;

}


