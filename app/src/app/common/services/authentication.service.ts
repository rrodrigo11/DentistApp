import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginStatus:BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(/*private socket:SocketIoService , */) {
    this.loginStatus.next(this.isLoggedIn());
  }

  get() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  isSocialUser() {
    return !!localStorage.getItem('social');
  }

  saveToken(token:string, email:string, idDentist:string){
    localStorage.setItem('token', token);
    localStorage.setItem('email',email);
    localStorage.setItem('idDentist',idDentist);
    this.loginStatus.next(true);
  }

  getToken():string|null{
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.clear();
    this.loginStatus.next(false);
  }
  

}
