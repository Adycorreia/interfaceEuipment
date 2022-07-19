import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "app/pages/models/detailEmployee";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { DefaultService } from "./default.service";


@Injectable({
    providedIn: 'root'
  })
  export class EmployeeListService extends DefaultService {
  
    constructor(private http: HttpClient) { 
     super('employee')
    }
  
    private httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + 'cG4uY3Y6ZGV2'
      })
    };
    
    getListEmployee() {
      return this.http.get<ResponseApp<Employee[]>>(`${this.url}/list`, this.httpOptions);
      }
  
    findById(id: String): Observable<ResponseApp<Employee>> {
      return this.http.get<ResponseApp<Employee>>(`${this.url}/detail/${id}`, this.httpOptions);
    }
  
    create(employee: Employee): Observable<ResponseApp<Employee>> {
      return this.http.post<ResponseApp<Employee>>(`${this.url}/save`, employee, this.httpOptions);
    }

    edit(employee: Employee): Observable<ResponseApp<Employee>> {
      return this.http.put<ResponseApp<Employee>>(`${this.url}/update/${employee.id}`, employee, this.httpOptions);
    }

    delete(id: string): Observable<ResponseApp<Employee>> {
      return this.http.delete<ResponseApp<Employee>>(`${this.url}/${id}`);
    }

  

  
  }
  