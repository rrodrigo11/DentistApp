import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

@Component({
  selector: 'app-dentist-info',
  templateUrl: './dentist-info.component.html',
  styleUrls: ['./dentist-info.component.scss']
})
export class DentistInfoComponent implements OnInit {

  loggedIn:boolean = false;

  constructor(private router: Router,
    private auth: AuthenticationService) {
      this.auth.loginStatus.subscribe(flag=>{
        this.loggedIn=flag;
        if(!this.loggedIn){
          this.router.navigate(['/login']);
        }
      })
     }

  ngOnInit(): void {
  }

}
