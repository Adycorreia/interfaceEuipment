import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Ferias } from "app/pages/models/ferias";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { DefaultService } from "./default.service";




@Injectable({
    providedIn: 'root'
  })
  export class FeriasService extends DefaultService {
  
    constructor(private http: HttpClient) { 
     super('listeFerias')
    }
  
  
    getListFerias() {
      return this.http.get<ResponseApp<Ferias[]>>(`${this.url}`);
      }
  
    findById(id: Number): Observable<ResponseApp<Ferias>> {
      return this.http.get<ResponseApp<Ferias>>(`${this.url}/id/${id}`);
    }

    findByIdAgenteId(id: Number): Observable<ResponseApp<Ferias>> {
      return this.http.get<ResponseApp<Ferias>>(`${this.url}/idarma/${id}`);
    }
  
    create(ferias: Ferias): Observable<ResponseApp<Ferias>> {
      return this.http.post<ResponseApp<Ferias>>(this.url, ferias);
    }

    delete(id: Number): Observable<ResponseApp<Ferias>> {
      return this.http.delete<ResponseApp<Ferias>>(`${this.url}/${id}`);
    }

    edit(ferias: Ferias): Observable<ResponseApp<Ferias>> {
      return this.http.put<ResponseApp<Ferias>>(`${this.url}/${ferias.idferia}`, ferias);
    }
  
  
  }
  