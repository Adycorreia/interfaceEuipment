import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Efectivos } from "app/pages/models/efectivos";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { DefaultService } from "./default.service";

@Injectable({
    providedIn: 'root'
  })
  export class EfectivosService extends DefaultService {
  
    constructor(private http: HttpClient) { 
     super('listefect')
    }
  
  
    getListEfectivos() {
      return this.http.get<ResponseApp<Efectivos[]>>(`${this.url}`);
      }
  
    findById(id: Number): Observable<ResponseApp<Efectivos>> {
      return this.http.get<ResponseApp<Efectivos>>(`${this.url}/id/${id}`);
    }
  
    create(efectivos: Efectivos): Observable<ResponseApp<Efectivos>> {
      return this.http.post<ResponseApp<Efectivos>>(this.url, efectivos);
    }

    delete(id: Number): Observable<ResponseApp<Efectivos>> {
      return this.http.delete<ResponseApp<Efectivos>>(`${this.url}/${id}`);
    }

    edit(efectivos: Efectivos): Observable<ResponseApp<Efectivos>> {
      return this.http.put<ResponseApp<Efectivos>>(`${this.url}/${efectivos.idagente}`, efectivos);
    }

    inspeArma(efectivos: Efectivos): Observable<ResponseApp<Efectivos>> {
      return this.http.put<ResponseApp<Efectivos>>(`${this.url}/arma/${efectivos.idagente}`, efectivos);
    }
  
  
  }
  