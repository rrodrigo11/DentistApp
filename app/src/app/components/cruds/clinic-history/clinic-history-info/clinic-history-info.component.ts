import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { RegistrationService } from 'src/app/common/services/registration.service';
import { SessionService } from 'src/app/common/services/session.service';

@Component({
  selector: 'app-clinic-history-info',
  templateUrl: './clinic-history-info.component.html',
  styleUrls: ['./clinic-history-info.component.scss']
})
export class ClinicHistoryInfoComponent implements OnInit {
  
  clinicH:any = ""
  loggedIn:boolean = false;
  

  constructor(private router: Router,
    private auth: AuthenticationService,
    private activatedRoute:ActivatedRoute,
    private registerService:RegistrationService,
    private sessionService: SessionService
    ) {
      this.auth.loginStatus.subscribe(flag=>{
        this.loggedIn=flag;
        if(!this.loggedIn){
          this.router.navigate(['/login']);
        }
      })
     }
     ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        console.log(params.id)
        this.sessionService.getClinic(params.id).then(response=>{
          console.log("Hola");
          console.log("Respuesta de la API: ", response);
          this.clinicH = response;
        }).catch(err=>{
          console.log("Error de API:",err);
        });
      })
    }

  returnClinicList(){
    this.router.navigate(['/clini/list/']);
    this.activatedRoute.params.subscribe(params=>{
      console.log('/clinic/'+params.id+'/'+params.did+'/'+params.pid);
      this.router.navigate(['/clinic/list/'+params.did+'/'+params.pid]);
    })
  }
  addOdon(){
    console.log("Entra a funcion!");
  }
}
