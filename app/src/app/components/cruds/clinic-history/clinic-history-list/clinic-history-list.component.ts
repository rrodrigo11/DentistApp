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
  selector: 'app-clinic-history-list',
  templateUrl: './clinic-history-list.component.html',
  styleUrls: ['./clinic-history-list.component.scss']
})
export class ClinicHistoryListComponent implements OnInit {

  users:any[] =[]

  constructor(private serviceList:ServiceListService, private ListService: ClientListService ) {}

  ngOnInit(): void {
    this.ListService.getList('users').then(response =>{
      this.users = response;
    });
  }
  myFunction()
  {}
}

