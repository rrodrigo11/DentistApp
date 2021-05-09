import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './common/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn:boolean = false;

  constructor(ngbConfig: NgbConfig,
    private auth: AuthenticationService,
    private router:Router) {
    ngbConfig.animation = true; //esta es la bandera para desactivar las animaciones bootstrap 
    
    this.auth.loginStatus.subscribe(flag=>{
      this.loggedIn=flag;
      if(!this.loggedIn){
        this.router.navigate(['/login']);//no funciona :/
      }
    })

  }

  title = 'app';
}
