import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { DefaultService } from "./default.service";


@Injectable({
    providedIn: 'root'
  })
  export class ParamService extends DefaultService {
  
    constructor(
      private http: HttpClient, 
      private toastService: NbToastrService
      ) { 
     super('equipment')
    }
  
    private httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + 'cG4uY3Y6ZGV2'
      })
    };
    
    getList() {
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


    ManageDataResponse(title: string, subtitle: string,
      nbDuration: number, ) {
      this.toastService.show(title, subtitle, {
        duration: nbDuration
      });
    }
  

  
  }
  