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
    
    let url = `${environment.apiUrl}pacient_route/`;//Aqui es cambiar por login de backend
    // let idDentista = this.sessionService.getIdDentist(data);
    url = `${environment.apiUrl}pacient_route/${data.email}`;//Aqui es cambiar por login de backend
    console.log(url);
    return this.httpClient.post(url, data).toPromise();
  }
}

