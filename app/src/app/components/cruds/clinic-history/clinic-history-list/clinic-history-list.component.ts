import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
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

  constructor(private activatedRoute:ActivatedRoute, private sessionService: SessionService ) {}

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

