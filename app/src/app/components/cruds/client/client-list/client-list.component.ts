import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

import { ClientListService } from 'src/app/common/services/client-list.service';
import { ServiceListService } from 'src/app/common/services/service-list.service';

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

  constructor(private serviceList:ServiceListService, private userService: ClientListService ) {}

  ngOnInit(): void {
    this.userService.getUsers().then(response =>{
      this.users = response;
    });
  }
  myFunction()
  {}
  
}
