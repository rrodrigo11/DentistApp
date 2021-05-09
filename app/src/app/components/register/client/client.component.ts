import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { RegistrationService } from 'src/app/common/services/registration.service';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientRegisterComponent implements OnInit {

  form:FormGroup;
  loggedIn:boolean = false;

  constructor(private router: Router,
    private auth: AuthenticationService,
    private formBuilder:FormBuilder,
    private registerService: RegistrationService) {
      this.auth.loginStatus.subscribe(flag=>{
        this.loggedIn=flag;
        if(!this.loggedIn){
          this.router.navigate(['/login']);
        }
      })
     }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required  ],
      email: ['', [Validators.required, Validators.email]  ],
      phone: ['', Validators.required ],
      photo: [''  ],
      address: [''  ],
      height: [''  ],
      weight:[''  ]   
    });
  }

  register(){
    if(this.form.valid){
      this.registerService.register(this.form.value).then(response=>{
        console.log("Respuesta de la API: ", response);
      }).catch(err=>{
        console.log("Error de API:",err);
      });    
    } else {
      console.log('Te faltan datos.')
    }
  }

}