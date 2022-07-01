import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Armamento } from "app/pages/models/armamento";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { DefaultService } from "./default.service";




@Injectable({
    providedIn: 'root'
  })
  export class ArmamentoService extends DefaultService {
  
    constructor(private http: HttpClient) { 
     super('listeArmament')
    }
  
  
    getListArmamentos() {
      return this.http.get<ResponseApp<Armamento[]>>(`${this.url}`);
      }
  
    findById(id: Number): Observable<ResponseApp<Armamento>> {
      return this.http.get<ResponseApp<Armamento>>(`${this.url}/id/${id}`);
    }
  
    create(armamento: Armamento): Observable<ResponseApp<Armamento>> {
      return this.http.post<ResponseApp<Armamento>>(this.url, armamento);
    }

    delete(id: Number): Observable<ResponseApp<Armamento>> {
      return this.http.delete<ResponseApp<Armamento>>(`${this.url}/${id}`);
    }

    edit(armamento: Armamento): Observable<ResponseApp<Armamento>> {
      return this.http.put<ResponseApp<Armamento>>(`${this.url}/${armamento.idarma}`, armamento);
    }
  
  
  }
  