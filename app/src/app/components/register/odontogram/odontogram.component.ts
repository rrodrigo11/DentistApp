import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styleUrls: ['./odontogram.component.scss']
})
export class OdontogramRegisterComponent implements OnInit {

  imageSrc = '../../../assets/odon.jpeg'  
  imageAlt = 'iPhone'
  dientesview:string = ''
  dientework:string = ''
  dienteview:any
  dientes:any = {
    "18":"",
    "17":"",
    "16":"",
    "15":"",
    "14":"",
    "13":"",
    "12":"",
    "11":"",
    "21":"",
 
  }
  vistas:boolean[]= [true,false,false,false,false,false,false,false]
  constructor() { }
  isVisible:boolean = false;

  ngOnInit(): void {
  }
  clickarea(diente:string){
    this.dientework =  this.dientes[diente]
    this.dientesview = diente
    this.dienteview =  `<h1>`+diente+`</h1>`
    this.dientes[this.dientesview] = this.dientework;
    console.log( this.dientes[this.dientesview]);
    this.dientes[+diente]
    console.log( this.dientes);


  }

}
