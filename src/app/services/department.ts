import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Department } from "app/pages/models/detailDepartament";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { DefaultService } from "./default.service";


@Injectable({
    providedIn: 'root'
  })
  export class DepartmentService extends DefaultService {
  
    constructor(private http: HttpClient) { 
     super('department')
    }
  
    private httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + 'cG4uY3Y6ZGV2'
      })
    };
    

      getListBySelfid(id: string): Observable<ResponseApp<Department>> {
        return this.http.get<ResponseApp<Department>>(`${this.url}/list/${id}`, this.httpOptions);
      }

  }
  