import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/common/services/session.service';

interface Diente {
  idDiente:number,
  descripcion: string
}
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

@Component({
  selector: 'app-odontogram-info',
  templateUrl: './odontogram-info.component.html',
  styleUrls: ['./odontogram-info.component.scss']
})
export class OdontogramInfoComponent implements OnInit {

  dientes: Diente[] = []
  Odontograma:any = {}


  loggedIn:boolean = false;

  constructor(private router: Router,
    private auth: AuthenticationService,
    private activatedRoute:ActivatedRoute,
    private sessionService: SessionService) {
      // this.auth.loginStatus.subscribe(flag=>{
      //   this.loggedIn=flag;
      //   if(!this.loggedIn){
      //     this.router.navigate(['/login']);
      //   }
      // })
     }
  ngOnInit(): void {
    console.log("Si carga");
    this.activatedRoute.params.subscribe(params=>{
      console.log(params.id)
      this.sessionService.getOdon(params.idH).then(response=>{
        console.log("Respuesta de la API : ", response[0]);
        this.Odontograma = response[0];
        this.dientes = this.Odontograma.dientes
      }).catch(err=>{
        console.log("Error de API:",err);
      });
    })
  }

}
