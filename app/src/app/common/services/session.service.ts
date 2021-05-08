import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient:HttpClient) { }

  signup(data:any):Promise<any> {
    const url = `${environment.apiUrl}user_route`;//Aqui es cambiar por login de backend
    return this.httpClient.post(url, data).toPromise();
  }
  getClients(email:any):Promise<any> {
    const url = `${environment.apiUrl}paciente_route/`+email;//Aqui es cambiar por login de backend
    return this.httpClient.get(url).toPromise();
  }
  deleteClient(email:any):Promise<any> {
    const url = `${environment.apiUrl}paciente_route/`+email;//Aqui es cambiar por login de backend
    return this.httpClient.delete(url).toPromise();
  }
  updateClient(email:any,data:any ):Promise<any> {
    const url = `${environment.apiUrl}paciente_route/`+email;//Aqui es cambiar por login de backend
    return this.httpClient.put(url, data).toPromise();
  }

  login(credentials:any):Promise<any> {
    const url = `${environment.apiUrl}auth`; //Aqui es cambiar por login de backend
    return this.httpClient.post(url, credentials).toPromise();
  }

  googleLogin(idToken:string):Promise<any> {
    const url = `${environment.apiUrl}google_route`;//Aqui es cambiar por login de backend
    return this.httpClient.post(url, { idToken: idToken }).toPromise();
  }
  
  saveToken(token:string){
    localStorage.setItem('token', token);
  }
}
