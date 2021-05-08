import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-ng-modal',
  templateUrl: './ng-modal.component.html'
})


export class NgModalComponent implements OnInit{
  form:FormGroup;

  @Input() public user: any;
  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private formBuilder:FormBuilder
  ) { }
 
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['Test', Validators.required  ],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]  ],
      phone: ['', Validators.required ],
      photo: '',
      address: ['', Validators.required  ],
      height: ['', Validators.required  ],
      weight:['', Validators.required  ]   
    });
  }
  ngOnChanges() {
    if(this.user) {
      console.log(this.user)
    }
  }
  get activeModal() {
    return this._NgbActiveModal;
  }
  passBack() {
    if(this.form.valid){
      console.log('Voy a hacer el registro')
      this.activeModal.close(this.user);

    } else {
      console.log('Te faltan datos.')
    }
  }
}
