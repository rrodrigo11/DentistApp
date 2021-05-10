import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SessionService } from 'src/app/common/services/session.service';

@Component({
  selector: 'app-clinic-history-info',
  templateUrl: './clinic-history-info.component.html',
  styleUrls: ['./clinic-history-info.component.scss']
})
export class ClinicHistoryInfoComponent implements OnInit {
  
  clinicH:any = ""
  loggedIn:boolean = false;
  odonExists:boolean = false;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private activatedRoute:ActivatedRoute,
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
        this.sessionService.getClinic(params.id).then(response=>{
          this.clinicH = response;
        }).catch(err=>{
          console.log("Error de API:",err);
        });
        this.sessionService.getOdon(params.id).then(response=>{
          if(response.length==0){
            this.odonExists=false;
          }else{
            this.odonExists=true;
          }
        }).catch(err=>{
          console.log("Error de API:",err);
        });
      })

    }

  returnClinicList(){
    this.router.navigate(['/clini/list/']);
    this.activatedRoute.params.subscribe(params=>{
      this.router.navigate(['/clinic/list/'+params.did+'/'+params.pid]);
    })
  }
  addOdon(){
    this.activatedRoute.params.subscribe(params=>{
      this.router.navigate(['/odontogram/register/'+params.id+'/'+params.did+'/'+params.pid]);
    })
  }
  navigateOdon(){
    this.activatedRoute.params.subscribe(params=>{
       console.log(`/odontogram/${params.id}`);
      this.router.navigate([`/odontogram/${params.id}`]);
      // this.router.navigate(['/clinic/'+params.id+'/'+params.did+'/'+params.pid]);
    })  
  }
}
