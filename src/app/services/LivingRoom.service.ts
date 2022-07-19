import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LivingRoom } from "app/pages/models/detailLivingRom";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { DefaultService } from "./default.service";


@Injectable({
    providedIn: 'root'
  })
  export class LivingRoomService extends DefaultService {
  
    constructor(private http: HttpClient) { 
     super('livingRoom')
    }
  
    private httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + 'cG4uY3Y6ZGV2'
      })
    };
    
    getList() {
      return this.http.get<ResponseApp<LivingRoom[]>>(`${this.url}/list`, this.httpOptions);
      }
  
    findById(id: string): Observable<ResponseApp<LivingRoom>> {
      return this.http.get<ResponseApp<LivingRoom>>(`${this.url}/detail/${id}`, this.httpOptions);
    }
  
    create(efectivos: LivingRoom): Observable<ResponseApp<LivingRoom>> {
      return this.http.post<ResponseApp<LivingRoom>>(this.url, efectivos);
    }

    delete(id: string): Observable<ResponseApp<LivingRoom>> {
      return this.http.delete<ResponseApp<LivingRoom>>(`${this.url}/${id}`);
    }

    edit(livingRoom: LivingRoom): Observable<ResponseApp<LivingRoom>> {
      return this.http.put<ResponseApp<LivingRoom>>(`${this.url}/${livingRoom.id}`, livingRoom);
    }


  
  }
  