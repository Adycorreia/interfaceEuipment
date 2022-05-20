import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Documents, StatusEnum } from 'app/pages/models/documents ';
import { Efectivos } from 'app/pages/models/efectivos ';
import { ResponseApp } from 'app/pages/models/response';


import { Observable } from 'rxjs';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root'
})
export class DocService extends DefaultService {

  constructor(private http: HttpClient) { 
   super('listipoDoc')
  }


}

