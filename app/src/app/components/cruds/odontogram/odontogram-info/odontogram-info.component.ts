import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/common/services/session.service';

interface Diente {
  idDiente:number,
  descripcion: string
}

@Component({
  selector: 'app-odontogram-info',
  templateUrl: './odontogram-info.component.html',
  styleUrls: ['./odontogram-info.component.scss']
})
export class OdontogramInfoComponent implements OnInit {

  dientes: Diente[] = []
  Odontograma:any = {}


  constructor(private activatedRoute:ActivatedRoute, private sessionService: SessionService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params.id)
      this.sessionService.getOdon(params.idH).then(response=>{
        console.log("Respuesta de la API: ", response[0]);
        this.Odontograma = response[0];
        this.dientes = this.Odontograma.dientes
      }).catch(err=>{
        console.log("Error de API:",err);
      });
    })
  }

}
