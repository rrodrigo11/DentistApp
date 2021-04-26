import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientListService {

  constructor(private httpClient:HttpClient) { }

  getList(type:any):Promise<any>{
    return this.httpClient.get(environment.apiUrl + type).toPromise();
  }

  getUserById(id:number):Promise<any>{
    const url = `${environment.apiUrl}users/${id}`;
    return this.httpClient.get(url).toPromise();
  }
}
