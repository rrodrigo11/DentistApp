import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';


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

  constructor() {}

  ngOnInit(): void {
    
  }
  myFunction()
  {}
}

