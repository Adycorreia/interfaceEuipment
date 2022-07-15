import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Department } from "app/pages/models/detailDepartament";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { Equipmentsearch } from "app/pages/models/equipmentsearch";
import { ResponseApp } from "app/pages/models/response";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { DefaultService } from "./default.service";


@Injectable({
  providedIn: 'root'
})
export class EquipmentdetailsService extends DefaultService {

  constructor(private http: HttpClient) { 
   super('equipment')
  }

  private httpOptions ={
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + 'cG4uY3Y6ZGV2'
    })
  };
  
  recusa: Error;
  erro: any[];

  getErroPedido() {
    return this.erro;
  }

  setErroPedido(value: any[]) {
    this.erro = value;
  }



  getList() {
    return this.http.get<ResponseApp<EquipamentoLista[]>>(`${this.url}/list`,this.httpOptions);
    }

  

  findById(id: string): Observable<ResponseApp<EquipamentoLista>> {
    return this.http.get<ResponseApp<EquipamentoLista>>(`${this.url}/search/${id}`, this.httpOptions);
  }

  searchEquipment(equipmentsearch: Equipmentsearch): Observable<ResponseApp<Equipmentsearch>> {
    return this.http.post<ResponseApp<Equipmentsearch>>(`${this.url}/search`, equipmentsearch,  this.httpOptions);
  }


/*
  treDatePipeTransform(value: any) {
    var data;
    try {
      data = this.datePipe.transform(value, "dd-MM-yyyy");
    } catch (e) {
      var day = value.substring(8, 10);
      var month = value.substring(5, 7);
      var year = value.substring(0, 4);

      data = day + "-" + month + "-" + year;
    }

    return data;
  }
*/
}