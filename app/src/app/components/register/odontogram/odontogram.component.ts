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
    "22":"",
    "23":"",
    "24":"",
    "25":"",
    "26":"",
    "27":"",
    "28":"",

    "48":"",
    "47":"",
    "46":"",
    "45":"",
    "44":"",
    "43":"",
    "42":"",
    "41":"",

    "31":"",
    "32":"",
    "33":"",
    "34":"",
    "35":"",
    "36":"",
    "37":"",
    "38":"",
  }
  vistas:boolean[]= [true,false,false,false,false,false,false,false]
  constructor() { }
  isVisible:boolean = false;

  ngOnInit(): void {
    
  }
  clickarea(diente:string){
    this.dientesview = diente
    this.dientework = this.dientes[this.dientesview]
    this.dienteview =  `<h1>`+diente+`</h1>`
    console.log( this.dientes[this.dientesview]);
    console.log( this.dientes);
  }
  savetooth(){
    this.dientes[this.dientesview] = this.dientework;
    console.log( this.dientes[this.dientesview]);
    console.log( this.dientes);
  }

}
