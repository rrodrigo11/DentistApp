import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SessionService } from 'src/app/common/services/session.service';

interface History{
  _id: string,
  date: string,
  observations: string,
  reason: string,
  historial_clinico: {}
}

@Component({
  selector: 'app-clinic-history-list',
  templateUrl: './clinic-history-list.component.html',
  styleUrls: ['./clinic-history-list.component.scss']
})
export class ClinicHistoryListComponent implements OnInit {

  histories:any ;
  loggedIn:boolean = false;

  constructor(private router: Router,
    private auth: AuthenticationService,
    private activatedRoute:ActivatedRoute,
    private sessionService: SessionService)
     {
      this.auth.loginStatus.subscribe(flag=>{
        this.loggedIn=flag;
        if(!this.loggedIn){
          this.router.navigate(['/login']);
        }
      })
      this.activatedRoute.params.subscribe(params=>{
        this.sessionService.getHistory_List(params.did, params.pid).then(response=>{
          this.histories = response;
        }).catch(err=>{
          console.log("Error de API:",err);
        });
      })
        
     }

  ngOnInit(): void {
  }
  addClinicHistory(){
    this.activatedRoute.params.subscribe(params=>{
      this.router.navigate(['/clinic/register/'+params.pid]);
    })
  }
  returnPacientList(){
    this.activatedRoute.params.subscribe(params=>{
      this.router.navigate(['/client/list/'+params.did]);
    })
  }
  deleteClinic(idClinic:string){
    this.activatedRoute.params.subscribe(params=>{
      this.sessionService.deleteClinic(idClinic),
      this.router.navigate(['/clinic/list/'+params.did+'/'+params.pid]);
    })
  }
  goToClinic(idHistory:string){
      this.router.navigate(['/clinic/'+idHistory]);
  }
}

