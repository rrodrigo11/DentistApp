import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit{

  loggedIn:boolean = false;

  constructor (private socialAuthService:SocialAuthService){}
  
  ngOnInit():void{
    this.socialAuthService.authState.subscribe(user=>{

      if(user){
        console.log('Se inicio sesion:', user);
      }else{
        console.log('No hay sesion');
      }
      
    })
  }

  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
