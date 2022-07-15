import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DetailsDomain } from "app/pages/models/detailDomain";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { DefaultService } from "./default.service";


@Injectable({
    providedIn: 'root'
  })
  export class DomainService extends DefaultService {
  
    constructor(private http: HttpClient) { 
     super('domain')
    }
  
    private httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + 'cG4uY3Y6ZGV2'
      })
    };
    

      getListBySelfidAndDomain(id: string, domain: string): Observable<ResponseApp<DetailsDomain>> {
        return this.http.get<ResponseApp<DetailsDomain>>(`${this.url}/list/${domain}/${id}`, this.httpOptions);
      }

  }
  