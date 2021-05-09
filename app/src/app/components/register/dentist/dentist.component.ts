import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SessionService } from 'src/app/common/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.scss']
})
export class DentistRegisterComponent implements OnInit {

  form:FormGroup;
  user:any = {};
  token:any="";

  constructor(
    private formBuilder:FormBuilder,
    private sessionService: SessionService,
    private auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]  ],
      password:['',[Validators.required, Validators.minLength(6)] ],
      confirmar: ['',[Validators.required, Validators.minLength(6)] ],
      name: ['', Validators.required ],
      lastname: ['', Validators.required  ],
      terms: ''  
    },{
      validators: () => { 
        if(!this.form) return;
        if(this.form.controls.password.value ==this.form.controls.confirmar.value){
          return null;
        } else{
          return{
          confirmPassword: true
          }
        }
      }
    });
  }
  register(){
    if(this.form.valid){
      console.log("Si funciona");
    this.sessionService.login(this.form.value).then(response=>{
      this.token = response.token;
       this.user =  this.sessionService.getIdDentist(this.form.value.email).then(response=>{
        this.user = response;
        this.auth.saveToken(this.token,this.form.value.email,this.user._id);
        let routerLink = "/client/list/"+this.user._id;
        this.router.navigate([routerLink]);
       });
    });
      // this.sessionService.signup(this.form.value).then(response=>{
      //   console.log("Respuesta de la API: ", response);
      //   this.token = response.token;
      //     this.user =  this.sessionService.getIdDentist(this.form.value.email).then(response=>{
      //     this.user = response;
      //     this.auth.saveToken(this.token, this.form.value.email, this.user._id);
      //   }.catch(err=>{
      //     console.log("MUERTE", err);
      //   })
      // }).catch(err=>{
      //   console.log("Error de API:",err);
      // });
    } else {
      console.log('Te faltan datos.');
      //Aqui sería lo mejor una directiva para crear un mensaje de advertencia de que faltan datos en formulario
    }
  }

}