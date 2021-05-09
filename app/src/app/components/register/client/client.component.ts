import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientRegisterComponent implements OnInit {

  form:FormGroup;
  constructor(private formBuilder:FormBuilder) { }
 
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['Test', Validators.required  ],
      email: ['', [Validators.required, Validators.email]  ],
      phone: ['', Validators.required ],
      photo: ['', Validators.required  ],
      dentist: ['', Validators.required  ],
      address: ['', Validators.required  ],
      height: ['', Validators.required  ],
      weight:['', Validators.required  ]   
    });
  }

  register(){
    if(this.form.valid){
      console.log('Voy a hacer el registro')
    } else {
      console.log('Te faltan datos.')
    }
  }

}