import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-clinic-history',
  templateUrl: './clinic-history.component.html',
  styleUrls: ['./clinic-history.component.scss']
})
export class ClinicHistoryRegisterComponent implements OnInit {

  form:FormGroup;
  constructor(private formBuilder:FormBuilder) { }
 

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['Test', Validators.required  ],
      dentistID: ['', Validators.required ],
      clientID: ['', Validators.required ],
      date: ['', Validators.required  ],
      reason: ['', Validators.required  ],
      observations: ['', Validators.required  ]
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
