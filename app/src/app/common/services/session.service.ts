import { HttpClient} from '@angular/common/http';
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
  getClients(idDentista:any):Promise<any> {
    const url = `${environment.apiUrl}paciente_route/`+idDentista;//Aqui es cambiar por login de backend
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
  registerOdon(idH:any,descripcion_general:any,dientes:any ):Promise<any> {
    const url = `${environment.apiUrl}odon_route/`+idH;//Aqui es cambiar por login de backend
    let body = {descripcion_general, dientes }
    return this.httpClient.post(url, body).toPromise();
  }
  getOdon(idH:any):Promise<any> {
    const url = `${environment.apiUrl}odon_route/`+idH;//Aqui es cambiar por login de backend
    return this.httpClient.get(url).toPromise();
  }
  deleteClinic(idClinic:string){
    const url = `${environment.apiUrl}historial_route/`+idClinic;
    return this.httpClient.delete(url).toPromise();  }
  login(credentials:any):Promise<any> {
    const url = `${environment.apiUrl}login_route`; 
    return this.httpClient.post(url, credentials).toPromise();
  }
  googleLogin(idToken:string):Promise<any> {
    const url = `${environment.apiUrl}google_route`;
    return this.httpClient.post(url, { idToken: idToken }).toPromise();
  }
  getIdDentist(email:any){
    const url = `${environment.apiUrl}user_route/${email}`;
    return this.httpClient.get(url).toPromise();
  }

  getHistory_List(idDentist:string, idPacient:string){
    const url = `${environment.apiUrl}historial_route/`+idDentist+"/"+idPacient;//Aqui es cambiar por login de backend
    return this.httpClient.get(url).toPromise();
  }
  getClinic(id:any):Promise<any> {
    console.log(id)
    const url = `${environment.apiUrl}historial_route/`+id //Aqui es cambiar por login de backend
    console.log(url)
    return this.httpClient.get(url).toPromise();
  }



}
