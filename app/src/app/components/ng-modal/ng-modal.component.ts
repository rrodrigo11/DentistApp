import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-ng-modal',
  templateUrl: './ng-modal.component.html'
})

export class NgModalComponent implements OnInit{
  form:FormGroup;

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private formBuilder:FormBuilder
  ) { }
 
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
  get activeModal() {
    return this._NgbActiveModal;
  }
}