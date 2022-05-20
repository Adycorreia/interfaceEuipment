import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Documents, StatusEnum } from 'app/pages/models/documents ';
import { ResponseApp } from 'app/pages/models/response';


import { Observable } from 'rxjs';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root'
})
export class DocService extends DefaultService {

  constructor(private http: HttpClient) { 
   super('listipoDoc')
  }

/*
  getListDocuments(documentsFilterEnum: DocumentsFilterEnum): Observable<ResponseApp<Documents[]>> {
    return this.http.get<ResponseApp<Documents[]>>(`${this.url}/${documentsFilterEnum}`);
  }

  getListDocuments() {
    return this.http.get<ResponseApp<Documents[]>>(`${this.url}`);
  }
*/

  getListByTipoDoc(statusEnum: string): Observable<ResponseApp<Documents[]>> {
    return this.http.get<ResponseApp<Documents[]>>(`${this.url}/${statusEnum}`);
  }

  
  /*create(documents:Documents){
    return this.http.post<ResponseApp<Documents[]>>(`${this.url}`,documents);
  }*/

  create(documents:Documents){
    return this.http.post<ResponseApp<Documents[]>>(`${this.url}`,documents);
  }


 /*
  private listadocuments(){
 
    this.tbUserDatalist=[
      {
      id: 1,
      matricula: "ST-06-NG",
      condutor: "Adilson Correia",
      propriedade: "Sandra Helena",
      motivo: "Falta de Seguros Automovel",
      n_oficio: "Nº-1234",
      tipoestado: "CARTA",
      tipo: StatusEnum.CARTA,
       },
      {
        id: 2,
        matricula: "ST-06-NG",
        condutor: "Adilson Correia",
        propriedade: "Sandra Helena",
        motivo: "Falta de Seguros Automovel",
        n_oficio: "Nº-1234",
        tipo: StatusEnum.LIVRETE,
        tipoestado: "LIVRETE"
      },
      {
        id: 3,
        matricula: "ST-06-NG",
        condutor: "Adilson Correia",
        propriedade: "Sandra Helena",
        motivo: "Falta de Seguros Automovel",
        n_oficio: "Nº-1234",
        tipo: StatusEnum.CARTA,
        tipoestado: "CARTA"
  
      },
      {
        id: 4,
        matricula: "ST-06-NG",
        condutor: "Adilson Correia",
        propriedade: "Sandra Helena",
        motivo: "Falta de Seguros Automovel",
        n_oficio: "Nº-1234",
        tipo: StatusEnum.LIVRETE,
        tipoestado: "LIVRETE"
        
      },
      {
        id: 4,
        matricula: "ST-06-NG",
        condutor: "Adilson Correia",
        propriedade: "Sandra Helena",
        motivo: "Falta de Seguros Automovel",
        n_oficio: "Nº-1234",
        tipo: StatusEnum.CARTA,
        tipoestado: "CARTA"
  
      }
    
    ]

  
  }

*/



}

