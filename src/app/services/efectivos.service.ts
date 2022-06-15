import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root'
})
export class DocService extends DefaultService {

  constructor(private http: HttpClient) { 
   super('listipoDoc')
  }


}

