import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';



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

  constructor( ) {}

  ngOnInit(): void {
    
  }

  myFunction()
  {}

  deleteClient(){

  }
}
