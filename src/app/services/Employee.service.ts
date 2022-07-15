import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { DefaultService } from "./default.service";


@Injectable({
    providedIn: 'root'
  })
  export class EquipamentoListaService extends DefaultService {
  
    constructor(private http: HttpClient) { 
     super('equipment')
    }
  
    private httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + 'cG4uY3Y6ZGV2'
      })
    };
    
    getListEquipamento() {
      return this.http.get<ResponseApp<EquipamentoLista[]>>(`${this.url}/list`,this.httpOptions);
      }
  
    findById(id: string): Observable<ResponseApp<EquipamentoLista>> {
      return this.http.get<ResponseApp<EquipamentoLista>>(`${this.url}/detail/${id}`, this.httpOptions);
    }
  
    create(efectivos: EquipamentoLista): Observable<ResponseApp<EquipamentoLista>> {
      return this.http.post<ResponseApp<EquipamentoLista>>(this.url, efectivos);
    }

    delete(id: string): Observable<ResponseApp<EquipamentoLista>> {
      return this.http.delete<ResponseApp<EquipamentoLista>>(`${this.url}/${id}`);
    }

    edit(efectivos: EquipamentoLista): Observable<ResponseApp<EquipamentoLista>> {
      return this.http.put<ResponseApp<EquipamentoLista>>(`${this.url}/${efectivos.id}`, efectivos);
    }


  
  }
  