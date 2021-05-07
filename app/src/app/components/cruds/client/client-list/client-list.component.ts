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
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

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

  deleteClient(){

  }
}
