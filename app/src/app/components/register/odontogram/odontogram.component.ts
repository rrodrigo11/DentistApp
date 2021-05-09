import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/common/services/session.service';


interface Diente {
  idDiente:number,
  descripcion: string
}


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
  descrigeneral:string = '' 
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
  dientess: Diente[] = []
  constructor(private activatedRoute:ActivatedRoute, private sessionService: SessionService) { }
  isVisible:boolean = false;

  ngOnInit(): void {
    
  }
  clickarea(diente:string){
    this.dientesview = diente
    this.dientework = this.dientes[this.dientesview]
    this.dienteview =  `<h1>`+diente+`</h1>`
    console.log( this.dientes[this.dientesview]);
  }
  savetooth(){
    console.log(this.dientesview)
    if(this.dientesview != ''){
      this.dientes[this.dientesview] = this.dientework;
      console.log( this.dientes[this.dientesview]);
      console.log( this.dientes);
      var flag = false
      this.dientess.forEach( (diente) => {
        if(diente.idDiente == +this.dientesview){
          diente.descripcion =  this.dientework
          flag=true
          console.log( this.dientess);
        }
    });
    if(flag==false){
        var tooth: Diente = {idDiente:+this.dientesview, descripcion:this.dientework};

        this.dientess.push(tooth)
        console.log( this.dientess);
    }
  }else{
    alert("Selecciona un diente");
  }
}

  regOdon(){
    if(this.descrigeneral != ''){
      this.activatedRoute.params.subscribe(params=>{
        this.sessionService.registerOdon(params.id,this.descrigeneral, this.dientess).then(response=>{
          console.log("Respuesta de la API: ", response);
        }).catch(err=>{
          console.log("Error de API:",err);
        });
      })
    }else{
      alert("Llena la descripcion general");
    }
  }
}
