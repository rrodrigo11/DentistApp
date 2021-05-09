import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SessionService } from 'src/app/common/services/session.service';


interface User{
  id:number,
  name: string,
  email:string,
  phone:string
}

@Component({
  selector: 'app-clinic-history-list',
  templateUrl: './clinic-history-list.component.html',
  styleUrls: ['./clinic-history-list.component.scss']
})
export class ClinicHistoryListComponent implements OnInit {

  users:any[] =[]
  loggedIn:boolean = false;

  constructor(private router: Router,
    private auth: AuthenticationService,
    private activatedRoute:ActivatedRoute,
    private sessionService: SessionService)
     {
      this.auth.loginStatus.subscribe(flag=>{
        this.loggedIn=flag;
        if(!this.loggedIn){
          this.router.navigate(['/login']);
        }
      })
     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.sessionService.getClients(params.email).then(response=>{
        console.log("Respuesta de la API: ", response);
        this.users = response;
      }).catch(err=>{
        console.log("Error de API:",err);
      });
    })
  }
  myFunction()
  {}
}

