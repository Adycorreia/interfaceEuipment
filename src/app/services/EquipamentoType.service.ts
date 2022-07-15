import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EquipmentType } from "app/pages/models/detailEquipmentType";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { DefaultService } from "./default.service";


@Injectable({
    providedIn: 'root'
  })
  export class EquipamentoTypeService extends DefaultService {
  
    constructor(private http: HttpClient) { 
     super('equipmentType')
    }
  
    private httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + 'cG4uY3Y6ZGV2'
      })
    };
   

    findById(id: string): Observable<ResponseApp<EquipmentType>> {
      return this.http.get<ResponseApp<EquipmentType>>(`${this.url}/list/${id}`, this.httpOptions);
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
  