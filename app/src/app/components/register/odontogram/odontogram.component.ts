import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styleUrls: ['./odontogram.component.scss']
})
export class OdontogramRegisterComponent implements OnInit {

  imageSrc = '../../../assets/odon.jpeg'  
  imageAlt = 'iPhone'

  constructor() { }

  ngOnInit(): void {
  }

}
