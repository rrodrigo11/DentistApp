import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  loggedIn:boolean

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.loginStatus.subscribe(status=>{
      this.loggedIn=status;
      //this.router.navigate(['/client/list']);
    });
   }

  ngOnInit(): void {
  }

  home(){
    if(this.loggedIn){
      console.log('/client/list'+localStorage.getItem("idDentist"));
      this.router.navigate(['/client/list/'+localStorage.getItem("idDentist")]);
    }else{
      this.router.navigate(['/login']);
    }
  }
}
