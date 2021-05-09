import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { RegistrationService } from 'src/app/common/services/registration.service';
@Component({
  selector: 'app-clinic-history',
  templateUrl: './clinic-history.component.html',
  styleUrls: ['./clinic-history.component.scss']
})
export class ClinicHistoryRegisterComponent implements OnInit {

  form:FormGroup;
  loggedIn:boolean = false;
  idPacient:any;
  constructor(private router: Router,
    private auth: AuthenticationService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private registerService: RegistrationService) 
    {
      this.auth.loginStatus.subscribe(flag=>{
        this.loggedIn=flag;
        if(!this.loggedIn){
          this.router.navigate(['/login']);
        }
      });
      
    }
 

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idDentist: [localStorage.getItem("idDentist"), Validators.required ],
      idPacient: ['', Validators.required ],
      date: '',
      reason: ['BE-cause', Validators.required  ],
      observations: '',   
    });
    
  }
  register(){
    this.activatedRoute.params.subscribe(params=>{
      this.form.value.idPacient = params.pid;
    });
    this.registerService.registerHistory(this.form.value).then(response=>{
      console.log("Respuesta de la API: ", response);
      this.router.navigate(['/clinic/list/'+localStorage.getItem("idDentist")+'/'+this.form.value.idPacient]);
    }).catch(err=>{
      console.log("Error de API:",err);
    });    
  }

  returnClinicList(){
    this.activatedRoute.params.subscribe(params=>{
      this.idPacient = params.pid;
      this.router.navigate(['/clinic/list/'+localStorage.getItem("idDentist")+'/'+ this.idPacient]);
    });
    
  }
}
