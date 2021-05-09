import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/common/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  loggedIn:boolean = false;
  
    constructor(private router: Router,
      private auth: AuthenticationService,
      private sessionService: SessionService) {
        this.auth.loginStatus.subscribe(flag=>{
          this.loggedIn=flag;
          if(!this.loggedIn){
            this.router.navigate(['/login']);
          }
        })
       }

  ngOnInit(): void {}
  

  logOut(){
    this.auth.logout()
    this.router.navigate(['/login']);
  }

  pacientsList(){
    let idDentist = localStorage.getItem("idDentist")
    this.router.navigate([`/client/list/${idDentist}`]);
  }

  
  userProfile(){
    this.router.navigate([`/dentist`]);
  }
}
