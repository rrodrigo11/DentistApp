import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/common/services/session.service';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.scss']
})
export class DentistRegisterComponent implements OnInit {

  form:FormGroup;
  constructor(private formBuilder:FormBuilder, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]  ],
      password:['',[Validators.required, Validators.minLength(6)] ],
      confirmar: ['',[Validators.required, Validators.minLength(6)] ],
      name: ['', Validators.required ],
      lastname: ['', Validators.required  ],
      gender: '',
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
      this.sessionService.signup(this.form.value).then(response=>{
        console.log("Respuesta de la API: ", response);
        this.sessionService.saveToken(response.token);
      }).catch(err=>{
        console.log("Error de API:",err);
      });
    } else {
      console.log('Te faltan datos.');
      //Aqui sería lo mejor una directiva para crear un mensaje de advertencia de que faltan datos en formulario
    }
  }

}