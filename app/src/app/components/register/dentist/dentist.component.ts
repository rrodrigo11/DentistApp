import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.scss']
})
export class DentistRegisterComponent implements OnInit {

  form:FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]  ],
      password:['',[Validators.required, Validators.minLength(6)] ],
      confirmar: ['',[Validators.required, Validators.minLength(6)] ],
      name: ['', Validators.required ],
      lastname: ['', Validators.required  ],
      gender: '',
      terms: ['', Validators.required  ],
      news: ''  
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
      console.log('Voy a hacer el registro')
    } else {
      console.log('Te faltan datos.')
    }
    console.log('?Form:', this.form);
  }

}