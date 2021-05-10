import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) { }

  register(data:any){
    let idDentist = localStorage.getItem("idDentist");
    let url = `${environment.apiUrl}paciente_route/${idDentist}`;//Aqui es cambiar por login de backend
    console.log(data,url);
    return this.httpClient.post(url, data).toPromise();
  }

  registerHistory(data:any){
    let idDentist = data.idDentist;
    let idPacient = data.idPacient;
    let url = `${environment.apiUrl}historial_route/${idDentist}/${idPacient}`;//Aqui es cambiar por login de backend
    //console.log(data,url);
    return this.httpClient.post(url, data).toPromise();
  }

  registerOdon(idClinic:string){
    let url = `${environment.apiUrl}odon_route/${idClinic}`;//Aqui es cambiar por login de backend
    console.log("Si llego a servicio",url);
    return this.httpClient.post(url,idClinic).toPromise();
  }
}

