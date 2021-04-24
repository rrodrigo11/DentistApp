import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceListService {

  constructor() { }

  getList(){
    console.log("ya hice login");
  }

}
